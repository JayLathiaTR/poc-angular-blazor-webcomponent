using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using TR.BlazorWasmWebComponent;
using TR.BlazorWasmWebComponent.Pages;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

//builder.RootComponents.Add<App>("#app");
//builder.RootComponents.Add<HeadOutlet>("head::after");
//builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

builder.RootComponents.RegisterCustomElement<CommentBoxComponent>("commentbox-component");
builder.RootComponents.RegisterCustomElement<Weather>("weather-component");

await builder.Build().RunAsync();
