# aws-amplify-student-gpa-calculator


![GitHub](https://img.shields.io/github/license/fermat01/aws-amplify-student-gpa-calculator?style=flat)
![GitHub top language](https://img.shields.io/github/languages/top/fermat01/aws-amplify-student-gpa-calculator?style=flat)
![GitHub language count](https://img.shields.io/github/languages/count/fermat01/aws-amplify-student-gpa-calculator?style=flat)
![GitHub last commit](https://img.shields.io/github/last-commit/fermat01/aws-amplify-student-gpa-calculator?style=flat)
![ViewCount](https://views.whatilearened.today/views/github/fermat01/aws-amplify-student-gpa-calculator.svg?cache=remove)
## Introduction

This project is a comprehensive React TypeScript application designed to calculate Grade Point Averages (GPAs) based on provided scores. The calculation employs a specific weight distribution, allocating 30% for assignments (10% for each assignment), 40% for midterms (20% for each midterm), and 30% for the final exam. The resulting GPA is then converted to a standard 4.0 scale and based on GPA, it returns a congratulations message.

## Requirements

- An AWS account (if you don't yet have one, please create one and [set up your environment](https://aws.amazon.com/getting-started/guides/setup-environment/))
- An IAM user that has the access and create AWS resources.
- Set up AWS CLI or use CloudShell
- Understanding of Javascript and TypeScript


## Architecture

The application leverages several AWS services to create a robust, scalable, and secure solution:

1. **AWS Amplify**: Serves as the foundation for the frontend development and deployment, providing a seamless integration with other AWS services
2. **AWS Lambda**: Handles serverless compute functions, allowing for efficient processing of GPA calculations without managing servers.
3. **Amazon DynamoDB**: Acts as the NoSQL database to store and retrieve student scores and calculated GPAs.
4. **Amazon API Gateway**: Manages the RESTful API endpoints, facilitating communication between the frontend and backend services.
5. **AWS IAM and Amazon Cognito**: Ensure secure user authentication and authorization, protecting sensitive student data and controlling access to AWS resources
   
<br>
 <img src="./src/assets/Amplify-gpa-architecture02.gif" width=""/>



###  Getting starting

####  1.  Clone the repository and navigate to the project directory
  
 ``` git clone https://github.com/fermat01/aws-amplify-student-gpa-calculator.git ```


 #### 2. Create an AWS Lambda function
   ...

 #### 3. Create Rest API using API Gateway


   ...

 #### 4. Create a DynamoDB Table & Set up IAM Policies and Permissions

   ... 

 #### 5. Create an AWS Cognito user pool
   ...

#### 6.  Deploy the app on AWS Amplify 

- Log into AWS Management Console, choose us-east-1 region, then go to Amplify service and click on **create new app**.

 <img src="./src/public/imgs/amplify1.png" width=""/>

- Select GitHub for the connect your repository to build, deploy, and host your React app and Select Continue. 

 <img src="./src/public/imgs/amplify2.png" width=""/>

- After that you will be automatically redirect to GitHub to authenticate.
In here you can give full access to amplify to access all your repositories or only select repositories. Select the second option and then choose your relevant repository and authorize then you will be redirect Amplify console.
Choose the repository and main branch of the repository, then select **Next**.

<img src="./src/public/imgs/amplify3.png" width=""/>

- Keep the default build settings and click on Edit YML file under the Frontend build command. Copy the provided amplify.yml file and paste it here as shown. **Save** and click **Next**

<img src="./src/public/imgs/amplify4.png" width=""/>

- Review the final details and select **Save** and **Deploy**.
 
<img src="./src/public/imgs/amplify5.png" width=""/>

 Amplify will now build your code and deploy. You can access your deployed application clicking given URL (https://master … amplifyapp.com).

<img src="./src/public/imgs/student_calculate_gpa_test.gif" width=""/>

###  Conclusion

This React TypeScript GPA calculator application, integrated with AWS services, represents a powerful and efficient solution for academic performance tracking. By leveraging the robust capabilities of AWS Amplify, Lambda, DynamoDB, API Gateway, IAM, and Cognito, the project delivers a secure, scalable, and user-friendly platform for students and educational institutions alike.







