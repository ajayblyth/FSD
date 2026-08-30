AWS — MERN Interview Theory

1. What is AWS?

AWS (Amazon Web Services) is a cloud computing platform provided by Amazon. It provides services for computing, storage, databases, networking, security, monitoring, and deployment. Instead of purchasing and maintaining physical servers, we can use AWS infrastructure over the internet. AWS resources can generally be created, scaled, and managed according to the application's requirements.

2. What is Cloud / Cloud Computing?

Cloud computing means using computing resources over the internet instead of managing physical infrastructure yourself. These resources can include servers, storage, databases, networking, and other services. For example, instead of buying a physical server for your Node.js application, you can run your application on an AWS EC2 instance. Cloud platforms also make it easier to scale applications when traffic increases.

3. Why do we use AWS?

AWS allows us to deploy and run applications without managing physical servers and data centers ourselves. It provides services for hosting applications, storing files, managing databases, networking, security, monitoring, and scaling. For a MERN application, for example, we could run the Node.js backend on EC2 and store uploaded images in S3. AWS also provides scalability and high availability features.

EC2 / Server
4. What is EC2?

EC2 (Elastic Compute Cloud) provides virtual servers in AWS. An EC2 instance is essentially a virtual machine where we can install software and run our Node.js/Express backend. We can choose the operating system, CPU core, memory, storage, and other configurations depending on our requirements. We are responsible for managing much of the server environment, such as installing Node.js and deploying our application.

Remember:

EC2 = Virtual Server

5. What is an EC2 Instance?

An EC2 instance is a running virtual server created using the EC2 service. For example, we can create an Windows EC2 instance, install Node.js, copy our Express application onto it, and run the backend there. The instance gets networking and security configurations that determine how it can communicate with the internet and other services. Multiple EC2 instances can also be used to handle higher traffic.

Why multiple?

Suppose your single server can handle:

EC2-1 → 1,000 requests

If traffic becomes much higher, you can have:

EC2-1 → 1,000 requests
EC2-2 → 1,000 requests
EC2-3 → 1,000 requests

The Load Balancer distributes incoming requ

6. How would you deploy a Node.js application on AWS?

A Node.js application can be deployed on an EC2 instance by creating the server, installing Node.js and required dependencies, and transferring the application code to the server. We then configure environment variables, start the Express application, and configure networking so users can access the API. In production, a process manager such as PM2 and a reverse proxy such as Nginx are commonly used. For larger applications, we can additionally use a load balancer and multiple EC2 instances.

React
  ↓
Node.js + Express
  ↓
EC2
  ↓
MongoDB
S3 / File Storage

7. What is S3?

S3 (Simple Storage Service) is an AWS object storage service. It is commonly used to store files such as profile pictures, product images, PDFs, videos, and backups. In a MERN application, the Node.js backend can receive a file from React and upload it to S3. The application can then store the object's key or URL/reference in MongoDB.

Remember:

S3 = Object/File Storage

8. What is an S3 Bucket?

An S3 bucket is a container used to store objects in S3. We create a bucket and then upload files/objects into that bucket. A bucket can have policies and permissions controlling how its objects are accessed. For example, we could have a bucket called my-product-images containing product images uploaded by our MERN application.

S3
 ↓
Bucket
 ↓
Objects


9. What is an S3 Object?

An S3 object is the actual data/file stored inside an S3 bucket. For example, profile.jpg, product.png, and resume.pdf can all be S3 objects. An object has the actual data, metadata, and a key that identifies its location within the bucket. For example, users/123/profile.jpg can be the object's key.

Bucket: my-app
       ↓
users/123/profile.jpg
       ↑
     Object

10. How does file upload work with React, Node.js and S3?

The user selects a file in React and sends it to the Node.js/Express backend, usually using multipart/form-data. The backend receives the file and uploads it to an S3 bucket using AWS SDK. S3 stores the file as an object and returns information such as its key/location. The backend can then store the S3 object key or relevant URL in MongoDB.

React
  ↓
Express API
  ↓
AWS S3
  ↓
Bucket
  ↓
Object
AWS Security

11. What is IAM?

IAM (Identity and Access Management) controls access to AWS resources. It determines who can access AWS services and what actions they are allowed to perform. For example, we can give a backend application permission to upload files to a specific S3 bucket without giving it full access to the AWS account. IAM uses identities, roles, and policies to control permissions.

Remember:

IAM = AWS Access + Permissions

12. What is an IAM User?

An IAM user represents an identity that can access AWS resources. Permissions can be attached to the user through IAM policies. For example, a developer could have permission to view EC2 and S3 resources but not delete production infrastructure. IAM users are mainly useful for human identities, while applications commonly use IAM roles.

13. What is an IAM Role?

An IAM Role provides permissions that can be assumed by AWS services or applications. For example, an EC2 instance running your Node.js application can have an IAM role that allows it to upload files to S3. This is safer than putting permanent AWS access keys directly inside your Node.js source code. AWS can provide temporary credentials to the application through the role.

EC2
 ↓
IAM Role
 ↓
Permission
 ↓
S3

14. What is an IAM Policy?

An IAM Policy is a document that defines what actions are allowed or denied on AWS resources. For example, a policy could allow PutObject to a particular S3 bucket. Instead of giving your Node.js backend full AWS permissions, you should follow the principle of least privilege and give only the permissions it needs.

Networking

15. What is a Security Group?

A Security Group acts like a virtual firewall for AWS resources such as EC2 instances. It controls which inbound and outbound network traffic is allowed using rules based on ports, protocols, and sources. For example, you can allow HTTPS traffic on port 443 while restricting SSH access. This helps protect your Node.js server from unwanted network access.

Internet
   ↓
Security Group
   ↓
EC2

16. What is a VPC?

VPC (Virtual Private Cloud) is a logically isolated network in AWS. AWS resources such as EC2 instances can be placed inside a VPC, where we control networking and communication. A VPC can contain subnets, route tables, gateways, and security configurations. You generally don't need deep VPC knowledge for a basic MERN interview.

Remember:

VPC = Network environment in AWS

17. What is a Region?

An AWS Region is a geographical area where AWS has infrastructure and data centers. For example, Mumbai is an AWS Region represented by ap-south-1. When creating resources such as EC2 or S3, the resource is associated with an AWS region. Choosing a region closer to your users can reduce network latency.

18. What is an Availability Zone?

An Availability Zone (AZ) is an isolated infrastructure location within an AWS Region. A region contains multiple Availability Zones to provide better availability and fault tolerance. If an application is deployed across multiple AZs, failure in one AZ does not necessarily take down the entire application.

Region
 ├── AZ 1
 ├── AZ 2
 └── AZ 3
Database

19. What is RDS?

RDS (Relational Database Service) is AWS's managed relational database service. It supports databases such as MySQL and PostgreSQL. AWS manages many infrastructure-related tasks such as provisioning, backups, and maintenance. For your MERN stack, however, MongoDB Atlas is more relevant than RDS because MERN uses MongoDB.

20. What is MongoDB Atlas?

MongoDB Atlas is a managed cloud service for MongoDB databases. Instead of installing and maintaining MongoDB yourself on an EC2 server, you can create a MongoDB cluster through Atlas. Your Node.js/Express backend connects to the Atlas database using a MongoDB connection string. Atlas handles much of the infrastructure, maintenance, backups, and scaling depending on the plan/configuration.

React
 ↓
Node.js + Express
 ↓
MongoDB Atlas

For MERN: Know MongoDB Atlas better than RDS.

Scaling

21. What is a Load Balancer?

A Load Balancer distributes incoming requests across multiple backend servers. For example, instead of sending all requests to one EC2 instance, a load balancer can distribute them across three Node.js servers. This improves availability and allows the application to handle more traffic. If one server becomes unhealthy, traffic can be directed to healthy servers.

             Load Balancer
             /     |     \
           EC2    EC2    EC2

22. What is Auto Scaling?

Auto Scaling automatically increases or decreases the number of running resources based on demand or configured rules. For example, when traffic increases, additional EC2 instances can be started. When traffic decreases, unnecessary instances can be removed. This helps maintain performance while avoiding unnecessary infrastructure costs.

High traffic → More EC2 instances
Low traffic  → Fewer EC2 instances
Monitoring / Performance
23. What is CloudWatch?

CloudWatch is an AWS monitoring and observability service. It can collect metrics and logs from AWS resources and applications. For example, you can monitor EC2 CPU usage or view application/server logs to troubleshoot problems. You can also create alarms when metrics cross a particular threshold.

Remember:

CloudWatch = Monitoring + Logs + Alarms
24. What is CloudFront?

CloudFront is AWS's Content Delivery Network (CDN). It caches and delivers content from locations closer to users, which can reduce latency and improve performance. It can be used for static assets, images, videos, and frontend files. CloudFront can work with S3 and other AWS services.

Remember:

CloudFront = CDN
25. What is Route 53?

Route 53 is AWS's DNS service. DNS maps a domain name such as api.example.com to the appropriate server or AWS resource. For example, you could configure your domain so that api.example.com points toward your backend infrastructure. Route 53 can also provide health checks and different traffic-routing options.

Remember:

Route 53 = DNS

26. What is Lambda?

AWS Lambda is a serverless service that runs code without requiring you to manage a traditional server. You create a function and AWS executes it when a configured event occurs. For example, a Lambda function could process an S3 upload or perform a small backend operation. Lambda is useful for event-driven or short-running workloads, although a traditional Express backend is often deployed differently.

Remember:

Lambda = Serverless Functions

Most Important for Your MERN Interview

If the interviewer asks "What AWS concepts have you worked with?", focus mainly on:

AWS
 ↓
Cloud
 ↓
EC2
 ↓
S3
 ├── Bucket
 └── Object
 ↓
IAM
 └── IAM Role
 ↓
Security Group
 ↓
MongoDB Atlas
 ↓
Load Balancer
 ↓
CloudWatch
Your most important practical flow
                 React
                   ↓
             Node.js/Express
                   ↓
             ┌─────┴─────┐
             ↓           ↓
            EC2         S3
         Backend      File Storage
                         ↓
                      Bucket
                         ↓
                       Object


Node.js/Express
       ↓
 MongoDB Atlas

For your MERN interview, I'd spend most of the 10-minute revision on EC2 + S3 + Bucket + Object + IAM + IAM Role + Security Group + MongoDB Atlas, and just know the definitions of Load Balancer, Auto Scaling, CloudWatch, CloudFront, Route 53, VPC, Region, AZ, and Lambda.