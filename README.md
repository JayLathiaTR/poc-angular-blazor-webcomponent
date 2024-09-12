# [POC] ANGULAR with BLAZOR WEB-COMPONENTS
This repository showcases the integration of a BlazorWebAssembly Library project used as a Web-Component in the Angular App

# Pre-requisites
* VS Code and Visual Studio 2022 Latest version is installed.
* Following latest versions are available:
  * Angular CLI: **18.2.3**
  * Node: **20.17.0**
  * Package Manager: npm **10.8.3**

# Create new component in Blazor
* Create new Razor page, ex: CommentBoxComponent.razor, and add your related html, styles and code.
* ![image](https://github.com/user-attachments/assets/f56b4bb2-3a72-4a12-a9da-1a108ec3fdca)
* Build the solution and run the project.
* Navigate to your razor page - for testing. For ex: **https://localhost:7105/commentbox**
* ![image](https://github.com/user-attachments/assets/3de2777b-7ef5-4a6f-b5f3-f1869b630bcf)
* Once tested, comment out the page property in your razor page (as this page will be integrated within Angular app)
* ![image](https://github.com/user-attachments/assets/46b35099-ce95-4593-a983-c14b77cb06a9)
* Register this newly created Razor page into **Program.cs** and comment out lines: 8, 9, 10 (as we are not using this project as a self-hosted)
* ![image](https://github.com/user-attachments/assets/c400e401-fb56-41a9-8551-018452763ae1)
* Rick click the project and click on Publish
* ![image](https://github.com/user-attachments/assets/5cea82ae-2376-40f4-89de-e6bb472586c7)
* The Publish window will be opened, where you need to click on the **Publish** button.
* After the publish is completed, which you can track in the output window, go to the puslished location
* ![image](https://github.com/user-attachments/assets/55f4b75b-051d-45ec-a336-f9aef987547e)
* Go to the wwwroot directory and copy 3 folders "**_content**", "**_framework**" and "**css**"

# Integrate Angular App with Blazor published components
* Navigate to the **src/assets** directory of the **TR.AngularBlazorClient** project and paste the above Blazor published folders
* ![image](https://github.com/user-attachments/assets/ac5544fa-ca64-4860-a770-cab51906addd)
* Now to use this new Blazor component in the Angular app, simply open the code in VS Code editor
* You can add a new component in angular app and add the Blazor component in the html with extra styling or content if you want
* ![image](https://github.com/user-attachments/assets/2ff9c0c7-b60b-48cc-8194-c5d852f4b70b)
* Update the Route to navigate to your component
* ![image](https://github.com/user-attachments/assets/39aa6b66-af1d-4f2c-8d60-f630c99230bd)
* Run these commands
  * **<code>ng build</code>**
  * **<code>ng serve -o</code>**
* Your app will be listening to port [localhost:4200](http://localhost:4200/), so open the browser for this port
* ![image](https://github.com/user-attachments/assets/3d124759-943b-4706-82e8-a544c03515a2)
* You can navigate to your route to see your Blazor component in action
* ![image](https://github.com/user-attachments/assets/5171a0f7-b797-43a8-a471-de087a270974)

