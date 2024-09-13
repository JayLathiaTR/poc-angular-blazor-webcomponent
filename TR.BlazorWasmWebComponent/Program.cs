using ChatboxComponentLibrary;
using CommentboxComponentLibrary;
using CounterComponentLibrary;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using TR.BlazorWasmWebComponent;
using TR.BlazorWasmWebComponent.Pages;
using WeatherComponentLibrary;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

//builder.RootComponents.Add<App>("#app");
//builder.RootComponents.Add<HeadOutlet>("head::after");
//builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

builder.RootComponents.RegisterCustomElement<CounterComponent>("counter-component");
builder.RootComponents.RegisterCustomElement<WeatherComponent>("weather-component");
builder.RootComponents.RegisterCustomElement<CommentboxComponent>("commentbox-component");
builder.RootComponents.RegisterCustomElement<ChatboxComponent>("chatbox-component");

await builder.Build().RunAsync();
