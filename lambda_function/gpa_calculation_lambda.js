import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import Joi from "joi";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "gpa-dynamodb-table";

const schema = Joi.object({
  studentId: Joi.string().required(),
  bornDate: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  assignment1: Joi.number().min(0).max(100).required(),
  assignment2: Joi.number().min(0).max(100).required(),
  assignment3: Joi.number().min(0).max(100).required(),
  midterm1: Joi.number().min(0).max(100).required(),
  midterm2: Joi.number().min(0).max(100).required(),
  final: Joi.number().min(0).max(100).required(),
});

const calculateGPA = (scores) => {
  const assignments =
    (scores.assignment1 + scores.assignment2 + scores.assignment3) / 3;
  const midterms = (scores.midterm1 + scores.midterm2) / 2;
  const finalExam = scores.final;

  const weightedScore = assignments * 0.3 + midterms * 0.4 + finalExam * 0.3;
  return (weightedScore / 25).toFixed(2);
};

export const handler = async (event) => {
  try {
    const { error, value } = schema.validate(event, { abortEarly: false });

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Validation error",
          details: error.details,
        }),
      };
    }

    const gpa = calculateGPA(value);

    const item = {
      studentId: value.studentId,
      bornDate: value.bornDate,
      fullName: `${value.firstName} ${value.lastName}`,
      assignment1: value.assignment1,
      assignment2: value.assignment2,
      assignment3: value.assignment3,
      midterm1: value.midterm1,
      midterm2: value.midterm2,
      final: value.final,
      gpa: parseFloat(gpa),
    };

    const command = new PutCommand({
      TableName: tableName,
      Item: item,
    });

    await dynamo.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "GPA calculated and stored successfully",
        gpa,
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error calculating and storing GPA" }),
    };
  }
};
