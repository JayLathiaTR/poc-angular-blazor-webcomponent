# [POC] ANGULAR with BLAZOR WEB-COMPONENTS
This repository showcases the integration of a BlazorWebAssembly Library project used as a Web-Component in the Angular App

# Pre-requisites
* VS Code and Visual Studio 2022 Latest version is installed.
* Following latest versions are available:
  * Angular CLI: **18.2.3**
  * Node: **20.17.0**
  * Package Manager: npm **10.8.3**

# Create new Blazor Library for a specific component
* Go to this path TR.BlazorComponentLibraries in cmd and run following command
  * <code>dotnet new razorclasslib -o CommentboxComponentLibrary</code>
* In place of **CommentboxComponent** give your component name which you are developing
* Open this Library project in VS 2022 and rename the _Component1.razor_ to **CommentboxComponent.razor**
* ![image](https://github.com/user-attachments/assets/16c26046-de63-478e-8706-ef496b614df1)
* Add your page route, div, style, and code for this razor component. Please note page route should always be unique.
* ![image](https://github.com/user-attachments/assets/a9c998c7-62bd-4cac-b8fd-231e38a705e0)
* Save your razor page and Build the solution in the **Release** mode
* ![image](https://github.com/user-attachments/assets/82d5f71a-24cb-4b27-b64b-90b3b72c852a)
* This will generate the dll and other binaries at **\bin\Release\net8.0**
* ![image](https://github.com/user-attachments/assets/484677d0-f1c6-43d5-8a1c-8f61f40816be)

# Integrate Library component into TR.BlazorWasmWebComponent
* Open **TR.BlazorWasmWebComponent** solution in VS 2022
* Right click on the Project and click Add project reference
* ![image](https://github.com/user-attachments/assets/3d2efa22-47ca-4aea-940e-bb3d885ef630)
* Browse your newly created component library dll and click Ok
* ![image](https://github.com/user-attachments/assets/ee1481d3-7477-43a8-9b88-29d4c2b61123)
* Open **Program.cs** and add this Library component as a CustomElement for Angular to consume as follows and uncomment the lines 12, 13, 14 for local testing.
* <code>**builder.RootComponents.RegisterCustomElement<CommentboxComponent>("commentbox-component");**</code>
* Register component name should be same as the Razor page name created in the library project.
* ![image](https://github.com/user-attachments/assets/6789bac4-26bc-4728-9796-218dd6a58217)
* Open **_Imports.razor** and add this component's using
* ![image](https://github.com/user-attachments/assets/4ec8a265-cf85-420b-a053-7f099c407cdf)
* Open **App.razor** and add this Component as an AdditionalAssemblies under Router to test the page in the Blazor run
* ![image](https://github.com/user-attachments/assets/82634dd1-bb45-4c9b-87d4-b8ca68a1e779)
* Build and Run the Project and navigate to the page's route, For ex **https://localhost:7105/commentbox** (this will be the route added in the library project)
* ![image](https://github.com/user-attachments/assets/705024c8-ea96-4fe7-a07f-2b2c277a383b)
* Close the browser and comment out lines: **12, 13, 14 of Program.cs** again (as we are not using this project as a self-hosted app)
* Rick click the project and click on Publish
* ![image](https://github.com/user-attachments/assets/5cea82ae-2376-40f4-89de-e6bb472586c7)
* The Publish window will be opened, where you need to click on the **Publish** button.
* After the publish is completed, go to the published location
* ![image](https://github.com/user-attachments/assets/55f4b75b-051d-45ec-a336-f9aef987547e)
* Go to the wwwroot directory and copy 2 folders "**<code>_content</code>**" and "**<code>_framework</code>**"

# Integrate Angular App with Blazor published components
* Navigate to the **src/assets** directory of the **TR.AngularBlazorClient** project and paste the above Blazor published folders
* ![image](https://github.com/user-attachments/assets/ac5544fa-ca64-4860-a770-cab51906addd)
* Now to use this new Blazor component in the Angular app, simply open the code in VS Code editor
* You can add a new component in angular app and add the Blazor component in the html with extra styling or content if you want
* Component name added here should have exact same name as it was registered in the Program.cs with CustomElement.
* ![image](https://github.com/user-attachments/assets/2ff9c0c7-b60b-48cc-8194-c5d852f4b70b)
* Update the Route to navigate to your component in <code>**app.routes.ts**</code> file
* ![image](https://github.com/user-attachments/assets/39aa6b66-af1d-4f2c-8d60-f630c99230bd)
* Run these commands
  * **<code>ng build</code>**
  * **<code>ng serve -o</code>**
* Your app will be listening to port [localhost:4200](http://localhost:4200/), so open the browser for this port
* ![image](https://github.com/user-attachments/assets/3d124759-943b-4706-82e8-a544c03515a2)
* You can navigate to your angular route for your Blazor component to see it in action.
* ![image](https://github.com/user-attachments/assets/68d77b1d-1bfe-4696-8dc0-c822516057d2)

# Using BlazorComponents with Attributes
* To use custom components with some attributes to be passed from Angular dynamically, follow these steps
* Create a Razor page with a property or a complex object decorated with [Parameter] to it
* ![image](https://github.com/user-attachments/assets/9a944e97-504a-495e-be0c-2f3d6b5e5c6f)
* From angular, pass the attributes cirectly bound to component (if it is just a single property) or bind the complex object with the help of JS query selector as follows
* ![image](https://github.com/user-attachments/assets/c0920dee-76e5-47d6-8480-9afb2d7ddb6f)
* ![image](https://github.com/user-attachments/assets/ca8d5647-1668-48f3-8287-7dfc3b845fec)
* **Note:**
  * For an attribute binding directly to html, use kebab casing. Ex: If the property in Blazor is: **StepCount**, then use **step-count** during attribute binding in angular html.
  * For a complex object binding via JS query selector, use the camel casing. Ex: If the object in the Blazor is: **SetDetails**, then use **setDetails** during angular JS binding.
