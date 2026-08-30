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

# AWS — 20 More Must-Know Interview Questions
27. What is an AMI?

AMI (Amazon Machine Image) is a template used to create EC2 instances. It contains information such as the operating system, installed software, and configuration needed to launch an instance. For example, we can use an Ubuntu AMI to create an EC2 server and then install Node.js on it.

Remember:

AMI = Template for creating EC2 instances

AMI
 ↓
EC2 Instance
 ↓
Node.js Application
28. What is an EC2 Instance Type?

An EC2 instance type defines the hardware resources available to an EC2 instance, such as CPU, memory, networking, and sometimes storage capabilities.

For example, a small Node.js application may use a smaller instance type, while a high-traffic application may require more CPU and memory. We choose the instance type based on the application's workload and requirements.

Remember:

Instance Type = CPU + Memory + Network capacity

29. What is SSH and why is it used with EC2?

SSH (Secure Shell) is a secure protocol used to connect to and manage a remote server. When working with a Linux EC2 instance, we can use SSH to connect to the server from our local computer and execute commands.

For example, after connecting through SSH, we can install Node.js, clone our Git repository, install dependencies, and start the application.

Developer
   ↓ SSH
EC2 Linux Server
   ↓
Node.js Application
30. What is an EC2 Key Pair?

An EC2 Key Pair is used to securely authenticate when connecting to an EC2 instance. It consists of a public key and a private key.

AWS places the public key on the EC2 instance, while the developer keeps the private key. The private key can then be used for SSH authentication.

Important: The private key should never be committed to GitHub or shared with others.

Remember:

Key Pair = Secure EC2 login

31. What is a Port?

A port is a logical communication endpoint used by applications to receive network traffic.

For example:

22   → SSH
80   → HTTP
443  → HTTPS
3000 → Common Node.js development port

If an Express application is running on port 3000, the EC2 Security Group must allow appropriate traffic to that port if users are supposed to access it directly.

In production, applications commonly expose 80/443 through a reverse proxy such as Nginx instead of exposing port 3000 directly.

32. What is Nginx and why is it used with Node.js?

Nginx is a web server and reverse proxy that can sit in front of a Node.js application.

Instead of users directly accessing:

EC2:3000

they can access:

https://example.com
       ↓
     Nginx
       ↓
Node.js:3000

Nginx can handle incoming HTTP/HTTPS requests and forward them to the Node.js application. It can also serve static files and help with SSL/TLS configuration.

Remember:

Nginx = Reverse Proxy + Web Server

33. What is PM2?

PM2 is a process manager commonly used to run Node.js applications in production.

Normally, if we run:

node server.js

the application can stop if the process crashes or the server restarts.

PM2 can keep the application running, restart it after crashes, and provide basic process monitoring.

PM2
 ↓
Node.js / Express

For example:

pm2 start server.js

Remember:

PM2 = Process Manager for Node.js

34. What is the difference between HTTP and HTTPS?

HTTP is a protocol used for communication between clients and servers. HTTPS is HTTP with encryption provided through TLS.

With HTTPS, data transmitted between the browser and server is encrypted, helping protect sensitive information such as login credentials and tokens.

For a production MERN application:

Browser
   ↓ HTTPS
Nginx / Load Balancer
   ↓ HTTP/HTTPS
Node.js

HTTPS is especially important for authentication and protecting user data.

35. What is an Elastic IP?

An Elastic IP is a static public IPv4 address that can be associated with an AWS resource such as an EC2 instance.

Normally, a public IP associated with an EC2 instance can change when the instance is stopped and started. An Elastic IP provides a persistent public IP address.

However, for production architectures, it's often preferable to use a domain name and load balancer rather than relying directly on an EC2 IP.

Remember:

Elastic IP = Static public IPv4 address

36. What is a subnet?

A subnet is a smaller network segment inside a VPC.

A VPC can contain multiple subnets, and they can be associated with different Availability Zones.

For example:

VPC
 ├── Public Subnet → EC2
 └── Private Subnet → Database

A public subnet can contain resources that need direct internet connectivity, while private subnets are commonly used for resources that should not be directly accessible from the internet.

Remember:

Subnet = Smaller network inside a VPC

37. What is a Public Subnet and Private Subnet?

A public subnet is a subnet whose routing configuration allows resources to reach the internet through an Internet Gateway.

A private subnet does not provide direct inbound internet access to its resources.

For example, a production architecture could have:

Internet
   ↓
Load Balancer
   ↓
Public Subnet
   ↓
EC2
   ↓
Private Subnet
   ↓
Database

The main idea is to keep resources such as databases away from direct public internet access.

38. What is an Internet Gateway?

An Internet Gateway is an AWS networking component that allows communication between resources in a VPC and the public internet, when the appropriate routing and public addressing are configured.

For example, a public EC2 instance can use an Internet Gateway to communicate with the internet.

EC2
 ↓
Route Table
 ↓
Internet Gateway
 ↓
Internet

Remember:

Internet Gateway = VPC ↔ Internet connectivity

39. What is a Route Table?

A route table contains rules that determine where network traffic should be sent.

For example, a public subnet can have a route such as:

0.0.0.0/0 → Internet Gateway

This means traffic intended for destinations outside the local network can be routed through the Internet Gateway.

Remember:

Route Table = Determines where network traffic goes

40. What is the difference between Security Groups and IAM?

These two are very commonly confused.

Security Group controls network traffic to and from resources such as EC2.

For example:

Allow TCP 443
Allow TCP 22

IAM controls permissions to AWS resources and actions.

For example:

Allow S3 PutObject
Allow EC2 DescribeInstances

So:

Security Group → Network access

IAM → AWS permissions

This is an important distinction to remember.

41. What is the AWS CLI?

AWS CLI (Command Line Interface) allows us to interact with AWS services using commands from a terminal.

For example, instead of using the AWS console to interact with S3, we can use commands such as:

aws s3 ls

or:

aws s3 cp file.jpg s3://my-bucket/

The CLI is useful for automation, deployment, administration, and scripting.

Remember:

AWS CLI = Manage AWS through terminal commands

42. What is an Environment Variable and why is it important in AWS deployment?

Environment variables store configuration values outside the application source code.

For a MERN backend, we might have:

PORT=5000
MONGODB_URI=...
JWT_SECRET=...
AWS_BUCKET_NAME=...

Instead of hardcoding these values in the source code, we configure them on the server or through an appropriate secrets/configuration mechanism.

This is important because sensitive information such as database credentials and JWT secrets should not be committed to GitHub.

43. How does your Node.js backend connect to MongoDB Atlas from EC2?

After deploying the Node.js application to EC2, the backend uses the MongoDB connection string to connect to MongoDB Atlas.

The connection string is typically stored in an environment variable.

EC2
 ↓
Node.js
 ↓
MONGODB_URI
 ↓
MongoDB Atlas

MongoDB Atlas must also allow the EC2 server's network access according to its configuration.

The application should not expose the database directly to the public internet unnecessarily.

44. How would you deploy a React frontend on AWS?

A React application can be built into static files using:

npm run build

The generated files can then be hosted using services such as S3 and delivered through CloudFront.

A common architecture is:

User
 ↓
CloudFront
 ↓
S3
 ↓
React Static Files

The React application can then make API requests to the Node.js backend running on EC2 or another backend service.

45. What is the difference between S3 and EC2?

EC2 provides a virtual server where we can run applications.

S3 provides object storage for files and data.

For a MERN application:

EC2
 ↓
Node.js + Express

and:

S3
 ↓
Images / Videos / PDFs / Files

So:

EC2 = Compute

S3 = Object Storage

You generally don't run your Node.js server inside S3.

46. What is the difference between scaling vertically and horizontally?

Vertical scaling means increasing the resources of a single server.

For example:

2 CPU + 4 GB RAM
       ↓
4 CPU + 8 GB RAM

Horizontal scaling means adding more servers.

        Load Balancer
       /     |     \
     EC2    EC2    EC2

Horizontal scaling is commonly used with load balancers because requests can be distributed across multiple instances.

Remember:

Vertical → Bigger server

Horizontal → More servers
⭐ 47. What happens when a user accesses your MERN application deployed on AWS?

This is probably one of the best scenario questions they can ask you.

A simplified production flow could be:

                 User
                   ↓
              Route 53
                   ↓
             CloudFront
                   ↓
          React Frontend
                   ↓
              API Request
                   ↓
           Load Balancer
             /       \
           EC2       EC2
            ↓         ↓
       Node + Express
             ↓
       MongoDB Atlas

React / Backend
       ↓
       S3
       ↓
Images / Files

The user first accesses the domain. DNS resolves the domain using Route 53. The frontend can be served through CloudFront/S3. API requests are sent to the backend, which can run on EC2. The backend communicates with MongoDB Atlas for application data and S3 for file storage.

⭐ 48. How would you secure a Node.js application deployed on EC2?

There are several layers of security.

First, use Security Groups to allow only required network ports. Use HTTPS for encrypted communication. Keep database credentials, JWT secrets, and AWS credentials out of the source code.

For AWS permissions, use IAM roles and follow the principle of least privilege.

We should also keep the operating system and dependencies updated and avoid exposing unnecessary services or ports to the internet.

A simple answer:

Security Group
      +
HTTPS
      +
IAM Role
      +
Environment/Secret Management
      +
Updated Dependencies
      +
Least Privilege
🔥 5 Scenario Questions You Should DEFINITELY Practice

These are slightly more important than memorizing another 20 definitions.

Scenario 1: "Your Node.js application is running on EC2, but you cannot access it from your browser. What will you check?"

I'd check whether the Node.js application is actually running and which port it is listening on. Then I'd check the EC2 Security Group to make sure the required port is allowed. I'd also verify the EC2 instance's networking/public access and whether Nginx or another reverse proxy is configured correctly if one is being used.

Is Node running?
      ↓
Correct port?
      ↓
Security Group?
      ↓
Network/Public access?
      ↓
Nginx/Reverse Proxy?
Scenario 2: "Your application works on localhost but doesn't work after deploying to EC2. What could be wrong?"

I'd check the environment variables, database connection string, port configuration, Security Group rules, and whether the Node.js process is running on EC2.

I'd also check server logs to identify errors.

Localhost works
      ↓
Check .env/config
      ↓
Check MongoDB connection
      ↓
Check EC2 process
      ↓
Check Security Group
      ↓
Check logs
Scenario 3: "Why shouldn't you put AWS access keys directly in your Node.js code?"

Hardcoding AWS access keys in source code is insecure because the keys could accidentally be pushed to GitHub or exposed to another person.

For applications running on AWS, an IAM role can be attached to the EC2 instance. The application can then obtain temporary credentials through the role instead of storing permanent credentials in the source code.

Bad:

Node.js
 ↓
Hardcoded AWS Access Key

Better:

EC2
 ↓
IAM Role
 ↓
S3 Permissions
Scenario 4: "What happens if your EC2 server crashes?"

If there is only one EC2 instance, the application may become unavailable until the server is recovered.

For higher availability, we can run multiple EC2 instances behind a Load Balancer and use Auto Scaling. If one instance becomes unhealthy, traffic can be directed to healthy instances, and Auto Scaling can replace or add instances according to its configuration.

             Load Balancer
             /           \
          EC2-1         EC2-2
          ❌             ✅
                         ↓
                       Users
Scenario 5: "Explain your MERN application AWS architecture."

I'd deploy the Node.js and Express backend on EC2. The React frontend could be built into static files and hosted using S3 with CloudFront. MongoDB Atlas would be used for the MongoDB database, and S3 could also store uploaded files such as images.

IAM would control AWS permissions, Security Groups would control network access, and CloudWatch could be used for monitoring and logs. For a larger application, I could add a Load Balancer and Auto Scaling.

                       Users
                         ↓
                   Route 53 / DNS
                         ↓
                  CloudFront / CDN
                         ↓
                    React + S3
                         ↓
                    API Requests
                         ↓
                  Load Balancer
                    /        \
                  EC2        EC2
                   \          /
                    Node.js
                       ↓
                MongoDB Atlas
                       
                   Node.js
                       ↓
                      S3
                       ↓
                 User Files
🧠 What I'd Prioritize Tonight

Don't try to memorize all 48 questions equally.

For your level of AWS exposure, I'd prioritize them like this:

🔴 Tier 1 — Must answer confidently
What is AWS?
What is EC2?
What is an EC2 instance?
How do you deploy Node.js on EC2?
What is S3?
Bucket vs Object
How does file upload work with S3?
What is IAM?
IAM User vs IAM Role
What is an IAM Policy?
What is a Security Group?
How does MERN connect to MongoDB Atlas?
What happens when your application is deployed?
What do you check when an EC2 app isn't accessible?
🟠 Tier 2 — Know the concept
Load Balancer
Auto Scaling
VPC
Region
Availability Zone
CloudWatch
CloudFront
Route 53
Lambda
AMI
SSH
Key Pair
Nginx
PM2
🟢 Tier 3 — Know roughly
Subnet
Public vs Private Subnet
Internet Gateway
Route Table
Elastic IP
AWS CLI
Vertical vs Horizontal Scaling
RDS
One thing I'd REALLY prepare

If they say:

"Okay, you've deployed a MERN application on AWS. Explain exactly what you did."

Don't start dumping definitions.

Tell the story:

"I created an EC2 instance, connected to it using SSH, installed Node.js and the required dependencies, transferred/cloned my backend code, configured environment variables, and started the Express server. I configured the Security Group to allow the required traffic. The backend connects to MongoDB Atlas using the MongoDB connection string. For file uploads, the backend uses the AWS SDK to upload files to an S3 bucket. In production, I could use Nginx as a reverse proxy and PM2 to keep the Node.js process running. For scalability, I could put multiple EC2 instances behind a Load Balancer and use Auto Scaling."

That answer demonstrates that you understand implementation, rather than merely memorizing AWS definitions.

And one small correction to your existing notes: EC2 does not have to be Windows—for a Node.js/MERN deployment, Linux/Ubuntu-based EC2 is very common. Also, an IAM role is generally preferable to storing AWS access keys on an EC2 server.