




<br>

<p align="center">
  <img width="280" height="280" src="showcase/logo.png">
</p>

> For the official presentation in Romanian see: [Official Presentation (RO)](https://docs.google.com/presentation/d/1NE-3EPntD04tFKVPOI1Jnk2dVM2oLqkTfXUmQ6W1b60/edit?usp=sharing)

# General Presentation
**UNpaper** is the practical part (project implementation) of my Bachelor Thesis at Transilvania University of Brasov (Romania).

**UNpaper** is a complex Document Digitizer Cloud Solution, implemented using Azure Cloud Architecture, Microservices, Serverless components, Single Page Applications,  Databases and Blob Storages, and other similar technologies.

The main purpose of **UNpaper** is to reduce time spent by medium and small sized businesses in redundant document processing activities, such as registering documents by hand. **UNpaper** thus automates the pre-processing part of analogous data (e.g. invoices, receipts, identification documents, etc.).

## Thesis Abstract

Countless domains and professional fields are lacking proper digitalization and automation when it comes to redundant daily processes and tasks. Numerous documents are massively pre-processed, as the data is being manually introduced in different administrative, financial, or managerial systems. These processes are highly demanding in terms of time and effort, and it would be more efficient to invest these resources into more high-level activities that require human assistance, such as: analyzing, consulting, managing, etc. The purpose of this paper is to describe the existing problems, and to explain the researching, analyzation, testing, and implementation processes of the proposed solution, more specifically a document digitizer cloud solution, which involves: a cloud architecture, state-of-the-art cognition technologies, Single Page Applications, modern data storage and management techniques, and last but not least intuitive userfriendly functionalities.

## Objectives

The three **main objectives** of UNpaper are, as follows:
1. Reducing time spent by employees in redundant paperwork activities, automating the pre-processing part in the manner the users impose.
2. Being accessible to small and medium-sized businesses, and especially being user friendly for people who have previously worked mostly with analogous data and are now transitioning to a more digital environment.
3. Offering a high level of security and reliability, by using state-of-the-art architectures and technologies.

**Extensive objectives** of UNpaper are, as follows:
1. Upgrading intelligent user flows to recognize specific keywords, document structures, etc. and handle (ex: Notifying the administrator of documents due dates)
2. Provide users with more advanced tools meant for defining sandbox environments, in order to improve the genericity of the solution and grant users more specificity in their tasks and requests.
3. Implementing tools for more specific local paperwork and legislative requirements, like automatic generation of payment sheets.
4. Creating a more solid link between UNpaper and other databases, ERMs, and systems widely used in office work.

# Technical Presentation

## User Flow

The following diagram describes the user flow, as initially intended. The flow is split in 3 stages/levels as follows:
- **User Level:** The physical level, of the analogous data (i.e. documents which need to be processed).
- **Application Level:** The main level, this is the level where UNpaper comes into play by digitalizing and automating the process.
- **Post-processing Level:** This level concerns about future post-processing and storing functionalities wanted/needed by the user.

![User Flow](showcase/user-flow.png)

## Functionalities

### Layout Analysis
- Quick analyzation of document's structure
- Text extraction capabilities (i.e. OCR)
- Tables extraction in CSV format
- *Compatible with: PNG, PDF, JPG, TIFF, JSON*

![Layout Analysis](showcase/layout.png)

### Prebuilt Analysis
- Quick analyzation of documents, based on pre-trained AI models (e.g. invoices, recipes, ID cards, etc.)
- Extraction of the analyzed data in a structured format (CSV)
- *Compatible with: PNG, PDF, JPG, TIFF, JSON*

|![Prebuilt Analysis 1](showcase/prebuilt1.png)|![Prebuilt Analysis 2](showcase/prebuilt2.png)|
|:-:|:-:|

### Custom labeled analysis & resources management
- Custom user hierarchy builder based on organizations and batches (categories of documents)
- Custom models creation and training, later used for extracting data from custom documents in a structured format
- Simultaneously processing of multiple documents (in a queue)

|![Custom Analysis 1](showcase/custom1.png)|![Custom Analysis 2](showcase/custom2.png)|
|:-:|:-:|
|![Custom Analysis 3](showcase/custom3.png)|![Custom Analysis 4](showcase/custom4.png)|

## Projects Structure

There are 3 main projects/components on which the UNpaper implementation is based upon. Below are some diagrams showing how each project is structured.

![Project Structure](showcase/repo.png)

### 1. UNpaper.WebUI

![UNpaperWebUI](showcase/UNpaperWebUI.png)

### 2. UNpaper.RegistryAPI

![UNpaperRegistryAPI](showcase/UNpaperRegistryAPI.png)

|Structure|Description|
|--|--|
|![RegistryAPI](showcase/registry-api.png)|<ul><li>**API:** Controllers and routing properties</li><li>**Business:** Business Logic</li><li>**Common:** Common classes within the project</li><li>**Data:** Data Logic classes (ex: Repositories, Database configurations, etc.)</li><li>**Interface:** Interfaces</li><li>**Model:** Entity Models</li></ul>|

#### Entity Models

![Entities Models](showcase/uml.png)

#### Registry API Flow

![API Flow](showcase/api_flow.png)

### 3. UNpaper.AzureFunctions

![UNpaperAzureFunctions](showcase/UNpaperAzureFunctions.png)

## Cloud Atchitecture

UNpaper is entirely developed using Azure Cloud tools and technologies, below is a diagram showing how these components are organized and related to each other.

![Cloud Architecture](showcase/cloud-architecture.png)

### Blob Storage Structure

|![Organizations & Batches](showcase/org-bch.png)|![Organizations & Batches Blobs](showcase/org-bch-blob.png)|
|:-:|:-:|

## Technologies and dependencies

Some of the main tools and technologies used are listed bellow:
- **Languages:**
	- C#
	- HTML, (S)CSS, JS
	- TypeScript
- **Frameworks:**
	- ASP NET
	- Angular
	- React
- **Packet Managers:**
	- NuGet
	- Node Package Manager
- **Azure Cloud Components:**
	- Azure App Service
	- Azure Functions
	- APIM (API Management Service)
	- Form Recognizer Cognitive Service
	- AD B2C (Active Directory Business-To-Client)
	- Azure SQL Server & SQL Database
	- Azure Blob Storage
	- Azure DevOps
- **Other:**
	- LINQ
	- Entity Framework Core
	- Postman & Swagger

### Microsoft FOTT Integration

At the core of UNpaper and it's functionalities are laying 2 main components:
- [**Azure Form Recognizer**](https://azure.microsoft.com/en-us/services/form-recognizer/#overview)
- [**Microsoft's OCR-Form-Tools (FOTT)**](https://github.com/microsoft/OCR-Form-Tools)

Integrating FOTT into UNpaper's WebUI SPA frontend was a complex and uncertain (at the beginning) process. Because UNpaper WebUI is developed using Angular, while FOTT uses React.js. Below is a diagram showing all the options which were taken into consideration while trying to handle this integration, together with the considered advantages, disadvantages, and final choices/results.

![FOTT Integration](showcase/fott_integration.png)

## Future Improvements
- Bank Sheet Templates automatic generation
- Employees Roadmaps automation
- Improved post-processing output management
- Automatic synchronization with Business Databases & ERMs
