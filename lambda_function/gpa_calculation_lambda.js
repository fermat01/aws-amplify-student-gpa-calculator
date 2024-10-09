import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "gpa-dynamodb-table";

export const handler = async (event) => {
  try {
    // Extract form data from event
    const {
      studentId,
      bornDate,
      firstName,
      lastName,
      assignment1,
      assignment2,
      assignment3,
      midterm1,
      midterm2,
      final,
    } = event;

    // Check if the student already exists
    const getCommand = new GetCommand({
      TableName: tableName,
      Key: { studentId },
    });

    const existingStudent = await dynamo.send(getCommand);

    // If student already exists, return a message
    if (existingStudent.Item) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Student with ID ${studentId} has already submitted their scores. Please contact student services for more information.`,
        }),
      };
    }

    // Calculate GPA
    const calculateGPA = () => {
      const assignments =
        (parseFloat(assignment1) +
          parseFloat(assignment2) +
          parseFloat(assignment3)) /
        3;
      const midterms = (parseFloat(midterm1) + parseFloat(midterm2)) / 2;
      const finalExam = parseFloat(final);

      // Assuming weights: Assignments 30%, Midterms 40%, Final 30%
      const weightedScore =
        assignments * 0.3 + midterms * 0.4 + finalExam * 0.3;

      // Convert to 4.0 scale (assuming 100-point scale input)
      return (weightedScore / 25).toFixed(2);
    };

    const gpa = calculateGPA();

    // Prepare item for DynamoDB
    const item = {
      studentId,
      bornDate: bornDate,
      fullName: firstName + " " + lastName,
      assignment1: parseFloat(assignment1),
      assignment2: parseFloat(assignment2),
      assignment3: parseFloat(assignment3),
      midterm1: parseFloat(midterm1),
      midterm2: parseFloat(midterm2),
      final: parseFloat(final),
      gpa: parseFloat(gpa),
    };

    // Store in DynamoDB
    const putCommand = new PutCommand({
      TableName: tableName,
      Item: item,
    });

    await dynamo.send(putCommand);

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
