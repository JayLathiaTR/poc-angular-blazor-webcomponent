# [POC] ANGULAR with BLAZOR WEB-COMPONENTS
This repository showcases the integration of a Blazor WebAssembly Library project used as a Web-Component in the Angular App

---

## Table of Contents
- [Pre-requisites](#pre-requisites)
- [Create New Blazor Library for a Specific Component](#create-new-blazor-library-for-a-specific-component)
- [Integrate Library Component into TR.BlazorWasmWebComponent](#integrate-library-component-into-trblazorwasmwebcomponent)
- [Integrate Angular App with Blazor Published Components](#integrate-angular-app-with-blazor-published-components)
- [Using BlazorComponents with Attributes](#using-blazorcomponents-with-attributes)

## Pre-requisites

| Tool               | Version   |
|--------------------|-----------|
| VS Code            | Latest    |
| Visual Studio 2022 | Latest    |
| Angular CLI        | 18.2.3    |
| Node               | 20.17.0   |
| Package Manager    | npm 10.8.3|

---

## Create new Blazor Library for a specific component
1. Navigate to the TR.BlazorComponentLibraries directory in the command line and run the following command:
   * `dotnet new razorclasslib -o CommentboxComponentLibrary`
   * Replace `CommentboxComponent` with the name of your component.
3. Open the Library project in **Visual Studio 2022** and rename `_Component1.razor` to `CommentboxComponent.razor`.
   ![image](https://github.com/user-attachments/assets/16c26046-de63-478e-8706-ef496b614df1)

4. Add your page route, div, style, and code for this Razor component. Ensure the page route is unique.
   ![image](https://github.com/user-attachments/assets/a9c998c7-62bd-4cac-b8fd-231e38a705e0)

5. Save your Razor page and build the solution in **Release** mode.
   ![image](https://github.com/user-attachments/assets/82d5f71a-24cb-4b27-b64b-90b3b72c852a)

6. This will generate the DLL and other binaries at `\bin\Release\net8.0`.
   ![image](https://github.com/user-attachments/assets/484677d0-f1c6-43d5-8a1c-8f61f40816be)

---

## Integrate Library component into TR.BlazorWasmWebComponent
1. Open the `TR.BlazorWasmWebComponent` solution in **Visual Studio 2022**.
2. Right-click on the project and select **Add Project Reference**.
   ![image](https://github.com/user-attachments/assets/3d2efa22-47ca-4aea-940e-bb3d885ef630)

4. Browse to your newly created component library DLL and click **OK**.
   ![image](https://github.com/user-attachments/assets/ee1481d3-7477-43a8-9b88-29d4c2b61123)

4. Open `Program.cs` and register the Library component as a CustomElement for Angular:
   * `builder.RootComponents.RegisterCustomElement<CommentboxComponent>("commentbox-component");`
   * Uncomment lines 12, 13, 14 for local testing.
   * Register component name should be same as the Razor page name created in the library project.
     ![image](https://github.com/user-attachments/assets/6789bac4-26bc-4728-9796-218dd6a58217)

5. Open `_Imports.razor` and add the component's using directive.
   ![image](https://github.com/user-attachments/assets/4ec8a265-cf85-420b-a053-7f099c407cdf)

6. Open `App.razor` and add this component as an AdditionalAssemblies under Router.
   ![image](https://github.com/user-attachments/assets/82634dd1-bb45-4c9b-87d4-b8ca68a1e779)

7. Build and run the project, navigate to the page's route (e.g., `https://localhost:7105/commentbox`).
   ![image](https://github.com/user-attachments/assets/705024c8-ea96-4fe7-a07f-2b2c277a383b)

8. Close the browser and comment out lines 12, 13, 14 of `Program.cs` again. (as we are not using this project as a self-hosted app)
9. Right-click the project and select **Publish**.
   ![image](https://github.com/user-attachments/assets/5cea82ae-2376-40f4-89de-e6bb472586c7)

10. Click the **Publish** button in the Publish window.
11. After publishing, go to the published location and navigate to the `wwwroot` directory. Copy the folders `_content` and `_framework`.
    ![image](https://github.com/user-attachments/assets/55f4b75b-051d-45ec-a336-f9aef987547e)

---

## Integrate Angular App with Blazor published components
1. Navigate to the `src/assets` directory of the `TR.AngularBlazorClient` project and paste the copied Blazor published folders.
   ![image](https://github.com/user-attachments/assets/ac5544fa-ca64-4860-a770-cab51906addd)

2. Open the code in **VS Code** editor and add the Blazor component in the Angular app.
   * Component name added here should have exact same name as it was registered in the `Program.cs` with `CustomElement`.
     ![image](https://github.com/user-attachments/assets/2ff9c0c7-b60b-48cc-8194-c5d852f4b70b)

3. Update the route to navigate to your component in `app.routes.ts`.
   ![image](https://github.com/user-attachments/assets/39aa6b66-af1d-4f2c-8d60-f630c99230bd)

4. Run the following commands:
   * **`ng build`**
   * **`ng serve -o`**
   * App will be accessible at [localhost:4200](http://localhost:4200/).
     ![image](https://github.com/user-attachments/assets/3d124759-943b-4706-82e8-a544c03515a2)

5. Navigate to your Angular route for your Blazor component to see it in action.
   ![image](https://github.com/user-attachments/assets/68d77b1d-1bfe-4696-8dc0-c822516057d2)

---

## Using BlazorComponents with Attributes
1. Create a Razor page with a property or a complex object decorated with `[Parameter]`.
   ![image](https://github.com/user-attachments/assets/9a944e97-504a-495e-be0c-2f3d6b5e5c6f)

2. From Angular, pass the attributes directly bound to the component or bind the complex object with the help of JS query selector.
   ![image](https://github.com/user-attachments/assets/c0920dee-76e5-47d6-8480-9afb2d7ddb6f)
   ![image](https://github.com/user-attachments/assets/ca8d5647-1668-48f3-8287-7dfc3b845fec)

**Note:**
- For an attribute binding directly to HTML, use kebab casing (e.g., Blazor `StepCount` becomes `step-count` in Angular).
- For a complex object binding via JS query selector, use camel casing (e.g., Blazor `SetDetails` becomes `setDetails` in Angular).
