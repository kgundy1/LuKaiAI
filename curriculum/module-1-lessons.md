## Lesson 1 — Open Claude and describe your idea

Before anything else, you need to be in front of Claude Design.

Claude Design lives at **claude.ai/design**. It's a tool from Anthropic — the company that makes Claude — built specifically for taking a rough idea and turning it into a working interactive prototype in minutes. You need at least a Claude Pro subscription to use it — $20 a month. If you don't have a Claude account yet, sign up at [claude.ai](http://claude.ai) first, get on Pro, then come back to claude.ai/design. Heavy users sometimes upgrade to Max ($100–$200 a month) because Claude Design shares a weekly compute allowance and design work eats through it, but Pro is enough to start.

When you land there, click **Prototype**. Give your project a name — anything works, it's just a label, you can change it later. You'll see two style options: **Wireframe** (sketchy, low-detail) and **High fidelity** (looks like a real, finished website or app). Pick High fidelity. Click **Create**.

Two panels appear: chat on the left, the canvas on the right. Right now the canvas says "Creations will appear here." That changes in a few minutes.

Look at the chat panel on the left. Stacked above the input box you'll see a "Start with context" section with four buttons — Design System, Add screenshot, Attach codebase, Drag in a Figma file — and three pre-applied tags: *Hi-fi design*, *Interactive prototype*, *Design System*. Ignore all of that for now. The only thing you need to do is type into the box that says **"Describe what you want to create..."**

Here's what to type: your idea, in one sentence, the way you'd describe it out loud to someone who asked what you were working on.

Not a feature list. Not a brief. Not a spec. A sentence.

Something like:

> *"I want a tool that helps me keep track of the plants in my garden — when I planted them, when they need watering, what I've harvested."*

Or shorter:

> *"Build me a website for tracking which clients I haven't talked to in three weeks."*

Or even shorter than that. The casual, half-formed version of your idea is the right version. Even a typo or a missing word is fine. The product is forgiving by design.

Hit **Send**.

Here's what's about to happen, and it's the part that surprises most people: Claude Design isn't going to start building yet. It's going to ask you a handful of structured questions first. *What kind of site is this? Which screen should be the hero? What aesthetic direction? Site name? How interactive should it feel?* Each question has a few options as buttons — and on almost every question, there's an option called **"Decide for me."**

That option is the most important thing in this lesson.

You don't need to know the answers. You don't need a strong opinion on aesthetic direction or layout style. If you have one, pick it. If you don't, pick "Decide for me" and Claude Design fills in the gap with something reasonable. You can change anything later. Nothing here locks you in.

That's why the casual one-sentence prompt works. The product is built to ask you the right questions back. Your job at the start isn't to know what you want — it's to start the conversation. The clarity emerges from the back-and-forth, not from preparation.

Answer the questions. Click **Continue**.

Now Claude Design starts building. Lesson 2 walks you through what you'll see.

---

## Lesson 2 — The Claude Design canvas: what just happened

You sent one sentence, answered a few questions, and a working website appeared. Take a breath.

There's a lot on the screen now, and most of it you'll never need to think about. Inside Claude Design there are three surfaces that actually matter. Once you know them, the rest of the interface gets out of your way.

### The canvas

The canvas is the big right-hand pane showing your prototype. It's not a video and it's not a screenshot. It's a real interactive thing. Click on a button. Type in a search bar. Hover over a card. Whatever Claude Design built for you, it works. The canvas is showing you what your idea actually looks like when it's running, not a mockup of what it might look like.

You can't break anything. Click everything. The whole point of this surface is that you can react to what you actually have rather than what you think you have.

A few things worth knowing while you're in here. The tab strip across the top of the canvas usually has a **Design Files** tab and at least one more tab named after your project's main file — that named tab is your live prototype. In the top right there's a **Present** button. Click it and your prototype goes full-screen with the Claude Design interface stripped away. That's what your idea looks like to a real user. Press Escape to come back.

### The file browser

Click the **Design Files** tab. The canvas changes — now you're looking at a list of files grouped under headings like Components, Stylesheets, and Scripts.

Those are the actual building blocks of your prototype. Real code, sitting in real files. When Claude Design produced what you're seeing on the canvas, it wrote a small project's worth of code in the background to make it work.

You don't need to read any of it. You don't need to know what a component or a stylesheet is. The file browser is here for two reasons.

First, it's evidence. The thing on the canvas is backed by real software, not magic. That matters later, in Module 2, when you take this prototype out of Claude Design and turn it into something you can actually deploy.

Second, it's where iteration leaves traces. Each time you change something, the files here update. New files appear. Old ones get rewritten. You don't have to watch — but if you ever wonder "did that change actually happen?", the file list is where you look.

Clicking a file opens a small preview on the far right with its name, size, and when it was last modified. Close it whenever and click back to your prototype tab.

### The Tweaks panel

This one's the gift. Look at the right edge of the canvas. There's usually a panel called **Tweaks**, sometimes tucked behind a small toggle near the top of the canvas. Open it.

Inside are dropdowns, sliders, and option buttons for things like theme color, layout density, grid columns, card style. The exact controls depend on what kind of prototype you built. Drag a slider. Pick a different color. Watch the prototype change in real time, with no prompt to write.

This surface exists because not every change needs to be a conversation. Some changes — "make it pink instead of blue," "use three columns instead of four," "make the cards smaller" — are faster as a click than as a sentence. The Tweaks panel handles those.

You'll still do most of your bigger iteration through the chat. Tweaks is for fine-tuning the things Claude Design already knew you'd want to tune. The two work together.

### The chat panel

Don't forget about the chat panel on the left. It looks quiet right now because you're past the questions phase, but it's where the next round of iteration happens. The input box at the bottom that used to say *"Describe what you want to create..."* is now an input box for changes — telling Claude Design what to add, fix, or rebuild. The next lesson is about that loop.

For now, take a few minutes and play. Click into the canvas and use your prototype the way a real user would. Open the file browser once, look at what's there, close it. Open the Tweaks panel and change at least one thing — color, density, anything — just to feel how immediate it is. When you've done all three, you're ready for the next lesson.

---

## Lesson 3 — Iterate by reacting, not by planning

Most people, the first time they sit down with Claude Design, get stuck before they ever start typing. They look at the prototype, decide it's not quite right, and then freeze because they don't know what to ask for next. They feel like they need to figure out the *full* answer before they say anything.

That's the wrong instinct. Drop it now and the rest of this gets dramatically easier.

You don't need to know what you want. You need to know what's wrong with what you're looking at.

Those are different jobs. The first one — knowing what you want — is hard. It's the kind of thing professional designers spend years learning to do from a blank page. The second one — knowing what's wrong with something already in front of you — is something you do effortlessly every day. You walk into a room and notice the lamp is in the wrong corner. You read an email and feel that one sentence is off. You don't need a framework for that. You just react.

Claude Design is built for the second job, not the first. It already gave you something. Your only job now is to react to it.

### How the loop works

Look at your prototype. Find one thing that's wrong, missing, or off. Just one. Don't make a list. Don't try to spot everything. Pick one.

Then go to the chat panel on the left and describe that one thing in plain language. The way you'd describe it to a coworker leaning over your shoulder.

It looks like this:

> *"The cards are too big — I want to see more of them on the screen at once."*
>
> *"There's no way to mark something as done. Add a checkbox or a button."*
>
> *"The colors feel too corporate. Make it warmer — earth tones instead of blue."*
>
> *"Move the search bar to the top of the page, where I'd actually look for it."*

Hit Send. Claude Design changes the thing. Sometimes it asks a clarifying question first — answer it casually, the same way you'd answer a question from a friend. Then look at what came back.

Now do it again. Find the next wrong thing. Send. Repeat.

That's the entire loop. It's not glamorous and it's not complicated. It's the work.

### Two kinds of iteration, and when to use each

You have two ways to change your prototype.

The chat panel handles big changes — anything that needs new content, new behavior, new pages, new logic. *Add a calendar view. Let me filter by category. Show me the user's name in the corner.* These are conversations.

The Tweaks panel on the right handles fine-tuning — color, density, layout, spacing, the size of the cards, the style of the logo. These are clicks. Drag a slider. Pick an option from a dropdown. Watch the prototype update.

The wrong move is to use the chat for things the Tweaks panel handles. Don't write *"make the cards smaller and use four columns instead of three"* in chat when there are sliders right there for it. The chat is too slow for that and the result is less precise. Use the panel.

The other wrong move is the opposite — trying to fight a big structural change with the Tweaks panel. If you need a whole new section, a new feature, or a different page, that's a chat job. Don't go hunting through dropdowns for it.

You'll feel the difference quickly. When something is in the panel, the panel is faster. When it isn't, you write a sentence.

### Reference materials surface naturally

Here's something that surprises people the first time it happens. As you iterate, you'll start hitting moments where Claude Design is making things up.

Maybe it invented a category for your products that doesn't actually exist in your business. Maybe it's showing fake numbers in a way that doesn't match how you actually count things. Maybe it built a workflow with steps your real workflow doesn't have, or skipped steps your real workflow needs.

That's not a bug. Claude Design is filling in plausible details because you didn't give it the real ones. The fix isn't to argue with it in chat. The fix is to show it the real thing — the actual document, the actual screenshot, the actual list. That's Lesson 4's whole topic and you'll hit it when you hit it.

For now, just notice when it happens. The moment you find yourself typing *"actually, the way it really works is..."* — stop. That's a signal. You're about to describe in words something you could just upload.

### Don't try to make it perfect in one round

A common trap: getting one thing fixed, then immediately trying to fix everything else in the next prompt, then getting frustrated when the next version misses three of the five things you asked for.

The reason that happens is mechanical. Big prompts produce loose changes. Small prompts produce precise ones. If you ask for five things at once, Claude Design has to make tradeoffs you can't see, and some of them will land wrong.

The fix is the same fix you'll use forever as a builder: one thing per round. It feels slower. It isn't. The version you get to in five small rounds is closer to right than the version you get to in one giant round, every single time.

### When to stop iterating

You'll know. The prototype starts feeling like the thing you actually want to build instead of a rough sketch of it. The corrections get smaller. You stop spotting major things wrong and start spotting nitpicks.

That's the signal. Lesson 5 is about what to do at that moment. Don't keep iterating past it — at some point you'll start fighting yourself, undoing changes, getting precious about details that don't matter yet.

For now, just keep reacting. Find one wrong thing. Fix it. Find the next. The clarity you didn't have when you started is going to show up about ten rounds in, and you won't have planned for any of it.

---

## Lesson 4 — Upload your real source documents, and screenshot what's not right

You're a few rounds into iterating. The prototype is closer to what you want, but something keeps going sideways. Claude Design has invented a rule that doesn't match how things actually work. Or it's showing fake data that's almost right but not quite. Or you've corrected the same detail three times and it keeps drifting back to wrong.

This is the lesson where you stop typing and start uploading.

### The signal

You're about to type *"actually, the way it really works is..."* followed by a long explanation. Or *"no, that field should be..."* followed by a definition. Or *"the form has the following sections..."* followed by a list.

Stop typing.

If you have to *describe in words* something that already exists as a document, a form, a screenshot, or a spreadsheet — you're doing the wrong job. Words are lossy. The real thing isn't.

Claude Design reads files. Real PDFs, real images, real spreadsheets, real screenshots. When you upload one, Claude Design works from the actual content instead of from your description of it. That's almost always closer to right.

### How to upload

There are two places you can put a file, and they do slightly different things.

**Drop a file directly into the chat panel.** Drag a PDF, image, or document straight onto the chat input box on the left. It attaches to your next message. Type whatever change you want — *"use this as the rule for how invoices get categorized"* or *"build the form to match this screenshot"* — and send. Claude Design treats the file as the authoritative source for what you're asking about.

**Drop a file into the canvas.** The canvas has a drop zone at the bottom — *"DROP FILES HERE — Images, docs, references, Figma links, or folders — Claude will use them as context."* Use this when you're adding reference material for the project as a whole, not for a single change. Things you drop here become part of the project's context and Claude Design can refer back to them across multiple iterations.

For most early uploads, the chat panel is the right answer. It's tied to the specific change you're making.

### What to upload

The rule is simple: upload the real thing instead of describing it.

If your prototype involves rules, upload the actual rule document. The PDF, the policy page, the regulation, the company handbook section — whatever defines the rules in the world your idea lives in. Don't paraphrase it. Don't summarize it. Hand over the document.

If your prototype involves forms, upload pictures or PDFs of the actual forms. The fields, the labels, the order, the section breaks — Claude Design will see all of it and build the digital version to match.

If your prototype involves data, upload a real example. A spreadsheet, an export, a screenshot of how the data looks in whatever system holds it today. A few rows of real data teaches Claude Design more than a paragraph of explanation.

If your prototype involves a workflow that already exists in some other tool — a current system, a paper process, a competitor — upload screenshots of that. Don't try to describe what the screen looks like. Show it.

### The screenshot habit

There's a second move that pairs with uploading documents, and it's just as important.

When something looks wrong on the screen, screenshot it. Drag the screenshot into the chat. Type one sentence about what's wrong. Send.

That's it. You don't need to describe the position, the size, the color, the broken layout, the missing element. Claude Design can see the picture. *"This card is overlapping this other card"* with a screenshot is faster and more accurate than three paragraphs of explanation without one.

This is going to feel almost too easy. Trust it. The screenshot does most of the work for you.

A few moments where the screenshot habit pays back the most:

- The layout looks broken on your screen but you can't quite describe how.
- A specific element — a button, a card, a section — is wrong and you don't know the technical name for it.
- Something works on your laptop but breaks on your phone, or the other way around.
- You see something visually weird and can't tell if it's a mistake or intentional.

Screenshot it. Drop it in. One sentence. Send.

### What this skill becomes

This isn't just a Module 1 thing. The capture-and-share habit you're building right now — drop the real document in, screenshot what's broken, send it with one line — is the single most important skill you'll use across the whole rest of the course.

When you get to Module 3 and you're looking at error messages from Claude Code, you'll screenshot them and send them. When you get to Module 4 and a deploy fails, you'll screenshot the failure logs and send them. When you get to Module 5 and the backend isn't connecting to the database, you'll screenshot whatever you can see and send it.

You don't have to understand any of it. You just have to capture it. Capture is the skill. Understanding is something Claude does on the other side.

If you only learn one thing in this whole course, learn this. Most people who get stuck building software get stuck because they're trying to describe in words something that's already on their screen. The fix is always the same: capture what's there, drop it in, ask for the fix.

---

## Lesson 5 — When the prototype is "good enough," ask Claude Design to package it

You've been iterating. The prototype is starting to feel like the thing you actually want to build instead of a sketch of it. The corrections are getting smaller. You're spotting nitpicks instead of missing pieces.

That's the moment.

This lesson is about recognizing it, then doing the one thing that turns your prototype into something you can keep building on outside Claude Design.

### "Good enough" is a real thing, not a feeling to push past

A lot of builders, the first time they get here, don't stop. They keep iterating. They want it to be perfect before they call it done. They've been having fun shaping it and they don't want to leave the conversation.

Don't do that. The prototype isn't supposed to be the finished product. It's supposed to be a clear-enough version of your idea that you can do real work on top of it — adding features, hooking up real data, deploying it so other people can use it. All of that happens in the next modules, not this one.

"Good enough" means three things, all at once:

- **The shape is right.** The major sections, screens, or features you imagined are there. Not polished. Just present.
- **The biggest wrong things are fixed.** The stuff that made you say "no, that's not how it works" the first few rounds — those are corrected.
- **What's left is small.** Color tweaks. Wording. Tiny layout adjustments. Things you could spend an hour on or skip entirely without changing what the thing fundamentally *is*.

If all three are true, you're done with Module 1. Stop iterating. Move on. You will revisit and improve every part of this later — that's what the rest of the course is.

If only two are true, do one or two more rounds. Then check again.

### Ask for the package

Once you're at "good enough," go to the chat panel and type something like this:

> *"Package all of this into a downloadable zip file I can keep working on. I want to take it out of Claude Design and continue building it as a real project."*

Or shorter:

> *"Give me a downloadable version of this project. I want to keep building on it outside Claude Design."*

Send it.

Claude Design will package the project — all the components, stylesheets, scripts, and supporting files you saw in the file browser — into a single ZIP file you can download to your computer.

That ZIP is the bridge. Everything from Lesson 2 onward — the canvas, the file browser, the Tweaks panel — was Claude Design's house. Now you're taking the project out of that house. From this point on, your prototype is a folder of files on your computer. It belongs to you. You can open it anywhere, on any computer, and keep working on it.

### Save the ZIP somewhere you'll find it

Download the ZIP. Move it to a place on your computer where you can find it again — your Desktop, your Documents folder, wherever you keep work you're going to come back to. Don't unzip it yet. Module 2 covers what to do with it next, and the first step of Module 2 is going to ask you exactly where this file lives.

Don't close your Claude Design project either. Keep the browser tab open or bookmark the project URL. You'll want the ability to come back to the live prototype as a reference — to see the visual version of what you're working on, or to ask Claude Design for one more change if you discover something missing later.

### What you have right now

Take a moment.

When you opened Lesson 1, you had an idea. Maybe a clear one, maybe a vague one. You typed it as one sentence into a tool you'd never used before.

Now you have a working interactive prototype of that idea. It runs. You can click in it. You can show it to somebody and have them understand what you're building. The biggest wrong things are corrected. The shape matches what's in your head. You have a downloadable ZIP of the whole thing sitting on your computer.

That's what Module 1 was for. You did it.

Module 2 is about taking that ZIP and turning it into a real project — one that lives on the internet, one you can deploy, one other people can use. The shape of the work changes a little. You'll meet some new tools. The skills you've already built — typing casually, reacting to what you see, capturing what's in front of you, uploading the real thing — all carry forward. None of it gets harder than what you just did.

When you're ready, open Module 2.
