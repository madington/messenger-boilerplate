# MESSenger boilerplate

For a basic text, background image and cta example, run:

`npm run basic`

For a simple example with a slider, run:
`npm run slider`

For an example with Streamedby video, run:
`npm run video`

## Running in MESS

To be able to run development in MESS you will need to create certificates and run `webpack serve` with the `--https` flag. This tool is provides an easy way of creating the certificates: https://github.com/FiloSottile/mkcert

Example of how to run modified npm script:

```
    "basic": "webpack serve --open --config=config/basic.dev.config.js --https --cert my-cert.pem --key my-cert-key.pem",
```

# MESSenger Framework

## Intro

MESSenger is a super small reactive framework built for use in dynamic display ad creatives. It's built to communicate with Madington MESS and Madington Studio for previewing purposes, but can be used standalone in creatives/ads. Its main purposes are:

- To speed up dynamic creative development
- To make dynamic creative previewing easy
- To enable dynamic creative templating

## Features

MESSenger features easy-to-use ways of binding dynamic properties and event handling to your HTML. It also features a messaging API making previewing of dynamic values easy.

### Reactivity

The idea behind MESSenger is reactivity. Much like frameworks such as VUE, AngularJS or React, MESSenger will update the views (your ad creative) whenever the model (a simple javascript object) changes. Data bindings can be done either by setting a data attribute on the HTML element or programmatically in your Javascript code.

In fact, MESSenger uses the same structure as Vue 2. It is, however, not meant to be a Vue competitor or replacement. MESSenger is built with dynamic/programmatic display creatives in mind and not necessarily meant to be used in bigger productions such as web apps.

The reactivity is crucial for previewing different styles and data settings but it also comes handy when serving your dynamic/programmatic creative in live environments. Bind your elements to the data properties and they will display the correct data dynamically – during preview and in production builds.

**Tip!** If you are using Google Doubleclick Studio and the Enabler (`enabler.js`) for your dynamic setup, you can use the `dynamicContent` object as your MESSenger data model out of the box.

### Internet Explorer

MESSenger handles nested objects well in modern browsers. But please be cautious if you need to support older browsers such as Internet Explorer. MESSenger works in IE, but deeply nested objects (arrays within arrays etc) can be problematic. If you need to support outdated browsers, it can be a good idea to flatten your data model object.

## Directives

MESSenger uses "directives". A directive is simply put a way of telling MESSenger what to do with a HTML element by setting a custom attribute on the element.

## Available directives

#### Data bindings

- Text binding: [m-text](#text-binding)
- Style binding: [m-style](#style-binding)
- Source binding: [m-src](#source-binding)
- Href binding: [m-href](#href-attribute-binding)
- CSS text binding: [m-csstext](#CSS-text-binding)
- Class binding: [m-class](#class-binding)
- Data attribute binding: [m-data-attrib](#data-attribute-binding)

#### Templating

- Array repeat binding: [m-for](#looping-array-binding)
- Visibility binding: [m-visible](#visibility-binding)

#### [Event bindings](#event-capturing)

- m-@click
- m-@load
- m-@mouseover
- m-@mouseout
- m-@mouseup
- m-@mousedown
- m-@touchstart
- m-@touchend
- m-@blur

# Getting started

## Step one

Import the framework by adding this script tag to your HTML document: `<script src="https://delivered-by-madington.com/messenger/latest.min.js"></script>`

## Step two

Initialize MESSenger. If you are familiar with Vue you will recognize the structure:

```
if (!window.MESSengerLoaded) {
  window.onMESSengerLoad = startCreative;
} else {
  startCreative();
}
function startCreative() {

    const M = new MESSenger({
        bannerSize: "320x250",
        data: {
            headerText: "Hello world!",
            headerColor: "#ff00ff"
        },
        methods: {
            exit() {
                window.open("https://madington.com", "_blank");
            }
        },
        computed: {
            discountedPrice(ctx) {
                // ctx is the MESSenger instance
                return ctx.data.price * ctx.data.discount;
            }
        },
        watch: {
            headerText(newValue, oldValue) {
                console.log("headerText has changed");
            }
        },
        mounted() {
            console.log("MESSenger is mounted");
            runOtherLogic();
        }
    })
}

```

### Options

MESSenger is initialized with an object with five named arguments:

- `bannerSize` This is optional. If not provided, MESSenger will try to figure this out by itself: it will first check if there is a URL parameter named `size` (`?size=320x250`) then check window inner width/height. `bannerSize` is used to assign size/format specific properties, such as images. MESSenger also sets this size as a class on the body element. It is set in this format: `s-320x250`. This can be useful when you need specific CSS for different banner sizes.

Example of how bannerSize is used to set size/format specific values:

```
data: {
    headerText: {
        __320x250__: "Text for size 320x250",
        __580x400__: "Text for size 580x400",
        __default__: "Text for all other sizes"
    }
}
```

- `data` This is the core data model. This is where you should put all of your dynamic properties. Whenever the data model changes, the HTML bound with directives will update and reflect the changes. When run in Madington MESS, for previewing purposes, MESSenger will handle all communication and update properties based on user input.

- `methods` This is where you should put methods that you need for handling events. Example:

```
// HTML
<button m-@click="clickHandler"></button>

//JS
new MESSenger({
    ...
    methods: {
        clickHandler(e) {
            e.stopPropagation();
            window.open(clickURL, "_blank);
        }
    }
})
```

- `computed` If you need to process or compute a value before it is displayed in the HTML use the `computed` object. Computed properties can be used in directives the same way as properties in `data`

- `watch` Use this if you need to run logic whenever a property in `data` is changed. Perhaps you need re-initiate a slider whenever an array of products change. Example:

```
data: {
    products: [...allProducts]
},
watch: {
    products(newValue, oldValue) {
        rebuildSlider();
    }
},
```

- `mounted` This function will run when MESSenger is initialized and every bound HTML has been updated.

## Step three

Start binding your data to HTML elements by using the MESSenger [directives](#data-bindings)

Example:

```
// HTML
<h1 m-text="headerText" m-style="color=headerColor"></h1>
<button m-@click="exit" m-text="ctaText"></button>

// Result:
<h1 style="color: #ff00ff">Hello world</h1>
<button>Click here</button>
```

### Updating data

If you are using Madington MESS or Madington Studio, please refer to our guide on how to preview your creative using those tools. If you are not using any of those tools you can update your data model through `MESSenger.data`:

```
// In your javascript:
const M = new MESSenger({
    data: {
        headerText: "Hello world",
        headerColor: "ff00ff"
    }
});
M.data.headerText = "Hi everybody!";
M.data.headerColor = "#FFFFFF";

// The HTML is instantly updated:
<h1 style="color: #FFFFFF;">Hi everybody</h1>
```

## Data bindings

### Text binding

_m-text_

`<div m-text="myDynamicText">`

Whenever you want to dynamically change the `innerHTML` of an element, use the data attribute `m-text` and point it to a property in your data model. Whenever the model changes, the html text will update to reflect the changes.
If you want a part of the text to reference another model property, use square brackets in the text: "Hello [country]". `[country]` will be substituted with the value of the property `country`. If `dataModel.country = "Norway!"` the result will be `Hello Norway!`.

Example:

```
// HTML
<h1 m-text="headerTitle"></h1>

// Data model
{
    headerTitle: "Hello [country]!",
    country: "Sweden"
}

// Result
<h1>Hello Sweden!</h1>
```

### Style binding

_m-style_

`<div m-style="backgroundColor=myDynamicBgColor">`

The style binding directive works by setting the data attribute "m-style" to a CSS style property which in turn is pointing to a data model property. Use the style property as you would in JS with camelCase – `backgroundColor`, `fontSize`, `color` – and point it to a property in your data model: `backgroundImage=myDynamicBackgroundImage`.

If you need to bind to more than one style attribute, separate them with a comma (`,`) like so: `m-style="fontSize=textSize,color=textColor"`

Example:

```
// HTML
<p m-style="fontSize=textSize,color=textColor"></p>

// Data model
{
    textSize: "2rem",
    textColor: "#FFF"
}

// Result
<p style="font-size: 2rem; color: #FFF;"></p>
```

### Source binding

_m-src_

`<img m-src="myDynamicImageSource" />`

If you want to dynamically set the `src` attribute of an image, a video or an audio element, use the `m-src` directive.

Example:

```
// HTML
<img m-src="creativeImageSource" />

// Data model
{
    creativeImageSource: "https://picsum.photos/200/300"
}

// Result
<img src="https://picsum.photos/200/300" />

```

### href attribute binding

_m-href_

`<a m-href="myDynamicLink">A dynamic link</a>`

The `m-href` directive binds to the href attribute on an anchor, area, base or link element.

```
// HTML
<a m-href="aDynamicLink">A dynamic link</a>

// Data model
{
    aDynamicLink: "https://studio.madington.com"
}

//Result
<a href="https://studio.madington.com">A dynamic link</a>
```

### CSS text binding

_m-csstext_

`<div m-csstext="inlineStyles">`

Use this directive to dynamically set the inline CSS text on an element.

```
// HTML
<div m-csstext="inlineStyles"></div>

// Data model
{
    inlineStyles: "background-color: #000; border-radius: 50px;"
}

// Result
<div style="background-color: #000; border-radius: 50px;"></div>
```

### Class binding

_m-class_

`<div m-class="dynamicClass"></div>`

This directive binds the class attribute of an element to one or multiple properties in the data model.

```
// HTML
<h1 m-class="dynamicClassOne, dynamicClassTwo"></h1>

// Data model
{
    dynamicClassOne: "creative_header",
    dynamicCLassTwo: "creative_header_dark-theme"
}

// Result
<h1 class="creative_header creative_header_dark-theme"></h1>

```

### Data attribute binding

_m-data-attrib_

`<div m-data-attrib="importantInfo=info"></div>`

This is the directive to use if you need to dynamically set a data attribute value on a HTML element. Use the data attribute you want set in camel casing and point it to a model property with an equal sign: `=`. Separate with a comma if you need to set multiple data attributes.

```
// HTML
<div m-data-attrib="importantInfo=info, someOtherInfo=otherInfo">

// Data model
{
    info: "lorem ipsum",
    otherInfo: "hello world
}

// Result
<div data-important-info="lorem ipsum" data-other-info="hello world">

```

## Templating

### Looping array binding

_m-for_

`<div m-for="(item, index) in myArray"><div class="slide-[[idx]]">[[item.text]]</div></div>`

This directive can be used to repeat an element for every item in an array. This can be useful if you need to setup a product slider or something similar. The syntax is `item in array` or `(item, index) in array`. You can use other directives in the element you want to be repeated. If you need to use image elements or other resources that will cause console errors if no source is set, you can wrap the element that you want to be repeated in a comment: `<!-- <img src="[[dynamicSource]]" /> -->`.

**NOTE**: MESSenger will remove and replace ALL comment tags inside the parent element when you use comments.

```
// HTML
<div m-for="(item, index) in myArray">
  <div class="slide-[[index]]">[[item.text]]</div>
</div>

// Data model
{
    myArray: [{
        text: "Text 1"
    },
        text: "Text 2"
    },
        text: "Text 3"
    }]
}

// Result
<div>
  <div class="slide-0">Text 1</div>
  <div class="slide-1">Text 2</div>
  <div class="slide-2">Text 3</div>
</div>

```

### Visibility binding

_m-visible_

`<div m-visible="shouldBeVisible"></data>`

This directive takes a boolean value and sets the elements visible css value to "visible" or "hidden" based on that.

```
// HTML
<div m-visible="showProducts">

// Data model
{
    showProducts: false
}

// Result
<div style="visible: hidden"></div>


```

## Event capturing

- _m-@click_
- _m-@load_
- _m-@mouseover_
- _m-@mouseout_
- _m-@mouseup_
- _m-@mousedown_
- _m-@touchstart_
- _m-@touchend_
- _m-@blur_

MESSengers second argument is an object with functions. Use the `m-@` directives (`m-@` followed by the event you want to capture) to bind events to those functions.

Example:

```
// HTML
<button m-@click="openStudio"></button>

// Data model
new MESSenger({ ...data }, {
    openStudio(e) {
        console.log(e.type)
        window.open("https://studio.madington.com)
    }
})

// Result
/* clicks on the button opens up https://studio.madington.com and logs "click" to the console */

```
