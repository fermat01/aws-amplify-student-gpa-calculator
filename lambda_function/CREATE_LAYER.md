To create a joi-layer.zip with Joi installed and all dependencies for AWS Lambda, follow these steps:


```mkdir joi-layer
cd joi-layer```


Initialize a new Node.js project:
````npm init -y````

Install Joi:

````npm install joi````

Create a nodejs directory inside your layer directory:

````mkdir nodejs````

Create a package.json file inside the nodejs directory:

````echo '{"dependencies": {"joi": "^20.x"}}' > nodejs/package.json````

Zip the contents of the nodejs directory:
````
cd nodejs
zip -r ../joi-layer.zip .
cd ..````