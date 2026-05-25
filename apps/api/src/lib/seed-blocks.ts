import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ContentBlock =
  | { type: 'markdown';        payload: { md: string } }
  | { type: 'quick_check';     payload: { question: string; choices: string[]; correctIndex: number; explain: string } }
  | { type: 'workflow_sorter'; payload: { tasks?: { id: string; label: string; answer: string; why: string }[]; bucketLeft?: { id: string; label: string }; bucketRight?: { id: string; label: string } } }
  | { type: 'checklist';       payload: { items: { id: string; label: string }[] } }
  | { type: 'screenshot';      payload: { slotId?: string; placeholder?: string; caption?: string; src?: string; alt?: string; annotations?: { x: string; y: string; label: string }[] } };

type BlockEntry = {
  moduleNumber: number;
  lessonNumber: number;
  blocks: ContentBlock[];
};

const BLOCK_ENTRIES: BlockEntry[] = [
  {
    moduleNumber: 0,
    lessonNumber: 1,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "This course teaches you how to build real software using Claude.\n\nNot \"learn to code.\" Not \"get into AI.\" Build software. The kind of software you'd otherwise pay a developer to build, or do without entirely because the path to getting it built felt too long.\n\nBy the end of Module 6, you'll have two things:\n\nA working tool that you actually use. Not a tutorial project, not a portfolio piece — your idea. The thing you'd actually open Monday morning, or use to solve something at home, or share with a friend who'd find it useful. Something you describe to Claude, iterate on until it works the way you want, and then ship.\n\nThe skill to keep building. The course is structured so that by the time you finish it, the next thing you build doesn't need a course. You'll know the moves: how to describe an idea so Claude builds the right thing, when to iterate by reacting versus planning, how to upload real source documents instead of explaining them, when a prototype is \"good enough\" to ship.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Who this is for\n\nAnyone with the will to build something and bring it to life. The form doesn't matter — a tool for your job, an app for your family, a side project you've been thinking about for years, a one-off thing you only need once. What matters is that you have an idea you actually want to see exist, and you're tired of waiting for someone else to build it.\n\nYou don't need a coding background. You don't need a design background. You don't need to have used AI before this. Operators, managers, hobbyists, parents, business owners, creators, people halfway into a career change, people who just had an idea last week — all of you fit.\n\nWhat you do need is the will to keep going when the first version isn't right. The course works because you bring the idea and the willingness to iterate; Claude brings the building. Bring those two things and the rest is teachable.",
        },
      },
      {
        type: 'quick_check',
        payload: {
          question: "You don't have a coding background. Does this course work for you?",
          choices: [
            "Only if I take a coding bootcamp first.",
            "Yes — what matters is the will to keep going when the first version isn't right.",
            "Only if I have a design background or have used AI before.",
          ],
          correctIndex: 1,
          explain: "Right. Operators, managers, parents, business owners — all fit. You bring the idea and the willingness to iterate; Claude brings the building.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What this is going to feel like\n\nFaster than you expect, and weirder than you expect. You'll describe an idea in plain English and Claude will hand you something working in under a minute. The first few times that happens it doesn't quite register. Then it does, and the thing that changes is what you allow yourself to build. The friction that used to stop you — \"I can't build that, I'd have to learn to code\" — stops being friction. That's the actual unlock.\n\nTake your time. Don't skip lessons. The course gets harder, not easier, but each lesson lands better when the one before it landed well.\n\nWhen you're ready, move on to Lesson 2.",
        },
      },
    ],
  },
  {
    moduleNumber: 0,
    lessonNumber: 2,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "Quick lesson. You need a Claude account to take this course.\n\nGo to **claude.ai** in your browser. Click **Sign up**. Use whatever email you check regularly — you'll get verification mail and you'll want to see it land. Pick a strong password.\n\nVerify your email when the confirmation arrives. Sign in.\n\nThat's it. You now have a Claude account.\n\nIf you already had one before starting this course, sign in to it. Don't make a second one — your work, your conversation history, and your eventual paid plan all live on the account you sign in with, and splitting them across two accounts is a headache you'll regret in Module 3.\n\nWhen you're signed in and looking at the Claude home screen, move on to Lesson 3.",
        },
      },
    ],
  },
  {
    moduleNumber: 0,
    lessonNumber: 3,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "This course requires Claude Pro. $20 a month, billed monthly, cancel anytime.\n\nThe reason: this course teaches you to build with **Claude Design** — the part of Claude where you describe an idea and it hands you back working software in a side panel you can interact with. Claude Design is a Pro feature. The Free plan gives you Claude the chatbot, which is excellent for a lot of things but not for what this course is doing. Without Pro, you can read the course but you won't be able to do the course.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## If $20/month is the right call for you\n\nClick your profile icon in Claude. Click **Upgrade** or **Settings → Plans**. Pick **Pro**. Add a card. You're in.\n\nOnce you're on Pro, look for **Claude Design** in the Claude interface. Different points of access exist depending on the device, but the most reliable path is: from the chat screen, start a new conversation, and either select Design as the mode or describe something that should be built — Claude will offer to open Design for you.\n\nSpend two minutes orienting. The chat side is where you talk to Claude. The canvas side is where the thing you're building shows up. You can interact with what's in the canvas — click buttons, fill forms, scroll — and tell Claude what's not right. That conversation between the two sides is the entire course.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## If $20/month isn't the right call right now\n\nHonest take: most of what this course teaches — how to describe an idea so an AI builds the right thing, when to iterate, when to upload source documents, when to ship — applies to other AI tools too. The specific walkthroughs assume Claude Design because that's the tool I use daily and the one I can teach with confidence. If you skip Pro and use a different AI, the techniques carry over but the screenshots, the examples, and some of the specifics won't match. You'll be doing translation work as you go.\n\nIf that translation work doesn't bother you, the Free plan will get you partway. If it does, come back when Pro fits the budget. The course will still be here.\n\n**When Pro is active and Claude Design is open in your browser, you're ready for Module 1.**",
        },
      },
    ],
  },
  {
    moduleNumber: 1,
    lessonNumber: 1,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## Get in front of Claude Design\n\nBefore anything else, you need to be in front of Claude Design.\n\nClaude Design lives at **claude.ai/design**. It's a tool from Anthropic — the company that makes Claude — built specifically for taking a rough idea and turning it into a working interactive prototype in minutes. You need at least a Claude Pro subscription to use it — $20 a month. If you don't have a Claude account yet, sign up at **claude.ai** first, get on Pro, then come back to claude.ai/design. Heavy users sometimes upgrade to Max ($100–$200 a month) because Claude Design shares a weekly compute allowance and design work eats through it, but Pro is enough to start.\n\nWhen you land there, click **Prototype**. Give your project a name — anything works, it's just a label, you can change it later. You'll see two style options: **Wireframe** (sketchy, low-detail) and **High fidelity** (looks like a real, finished website or app). Pick High fidelity. Click **Create**.\n\nTwo panels appear: chat on the left, the canvas on the right. Right now the canvas says \"Creations will appear here.\" That changes in a few minutes.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Type your idea, in one sentence\n\nLook at the chat panel on the left. Stacked above the input box you'll see a \"Start with context\" section with four buttons — Design System, Add screenshot, Attach codebase, Drag in a Figma file — and three pre-applied tags: *Hi-fi design*, *Interactive prototype*, *Design System*. Ignore all of that for now. The only thing you need to do is type into the box that says **\"Describe what you want to create...\"**\n\nHere's what to type: your idea, in one sentence, the way you'd describe it out loud to someone who asked what you were working on.\n\nNot a feature list. Not a brief. Not a spec. A sentence.\n\nSomething like:\n\n> *\"I want a tool that helps me keep track of the plants in my garden — when I planted them, when they need watering, what I've harvested.\"*\n\nOr shorter:\n\n> *\"Build me a website for tracking which clients I haven't talked to in three weeks.\"*\n\nOr even shorter than that. The casual, half-formed version of your idea is the right version. Even a typo or a missing word is fine. The product is forgiving by design.\n\nHit **Send**.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## \"Decide for me\" is the most important option in this lesson\n\nHere's what's about to happen, and it's the part that surprises most people: Claude Design isn't going to start building yet. It's going to ask you a handful of structured questions first. *What kind of site is this? Which screen should be the hero? What aesthetic direction? Site name? How interactive should it feel?* Each question has a few options as buttons — and on almost every question, there's an option called **\"Decide for me.\"**\n\nThat option is the most important thing in this lesson.\n\nYou don't need to know the answers. You don't need a strong opinion on aesthetic direction or layout style. If you have one, pick it. If you don't, pick \"Decide for me\" and Claude Design fills in the gap with something reasonable. You can change anything later. Nothing here locks you in.\n\nThat's why the casual one-sentence prompt works. The product is built to ask you the right questions back. Your job at the start isn't to know what you want — it's to start the conversation. The clarity emerges from the back-and-forth, not from preparation.\n\nAnswer the questions. Click **Continue**.\n\nNow Claude Design starts building. Lesson 2 walks you through what you'll see.",
        },
      },
    ],
  },
  {
    moduleNumber: 1,
    lessonNumber: 2,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## What just happened\n\nYou sent one sentence, answered a few questions, and a working website appeared. Take a breath.\n\nThere's a lot on the screen now, and most of it you'll never need to think about. Inside Claude Design there are three surfaces that actually matter. Once you know them, the rest of the interface gets out of your way.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## The canvas\n\nThe canvas is the big right-hand pane showing your prototype. It's not a video and it's not a screenshot. It's a real interactive thing. Click on a button. Type in a search bar. Hover over a card. Whatever Claude Design built for you, it works. The canvas is showing you what your idea actually looks like when it's running, not a mockup of what it might look like.\n\nYou can't break anything. Click everything. The whole point of this surface is that you can react to what you actually have rather than what you think you have.\n\nA few things worth knowing while you're in here. The tab strip across the top of the canvas usually has a **Design Files** tab and at least one more tab named after your project's main file — that named tab is your live prototype. In the top right there's a **Present** button. Click it and your prototype goes full-screen with the Claude Design interface stripped away. That's what your idea looks like to a real user. Press Escape to come back.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## The file browser\n\nClick the **Design Files** tab. The canvas changes — now you're looking at a list of files grouped under headings like Components, Stylesheets, and Scripts.\n\nThose are the actual building blocks of your prototype. Real code, sitting in real files. When Claude Design produced what you're seeing on the canvas, it wrote a small project's worth of code in the background to make it work.\n\nYou don't need to read any of it. You don't need to know what a component or a stylesheet is. The file browser is here for two reasons.\n\nFirst, it's evidence. The thing on the canvas is backed by real software, not magic. That matters later, in Module 2, when you take this prototype out of Claude Design and turn it into something you can actually deploy.\n\nSecond, it's where iteration leaves traces. Each time you change something, the files here update. New files appear. Old ones get rewritten. You don't have to watch — but if you ever wonder \"did that change actually happen?\", the file list is where you look.\n\nClicking a file opens a small preview on the far right with its name, size, and when it was last modified. Close it whenever and click back to your prototype tab.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## The Tweaks panel\n\nThis one's the gift. Look at the right edge of the canvas. There's usually a panel called **Tweaks**, sometimes tucked behind a small toggle near the top of the canvas. Open it.\n\nInside are dropdowns, sliders, and option buttons for things like theme color, layout density, grid columns, card style. The exact controls depend on what kind of prototype you built. Drag a slider. Pick a different color. Watch the prototype change in real time, with no prompt to write.\n\nThis surface exists because not every change needs to be a conversation. Some changes — \"make it pink instead of blue,\" \"use three columns instead of four,\" \"make the cards smaller\" — are faster as a click than as a sentence. The Tweaks panel handles those.\n\nYou'll still do most of your bigger iteration through the chat. Tweaks is for fine-tuning the things Claude Design already knew you'd want to tune. The two work together.",
        },
      },
      {
        type: 'quick_check',
        payload: {
          question: "Which surface tells you what your idea looks like running, not just a mockup?",
          choices: [
            "The Design Files tab.",
            "The canvas.",
            "The Tweaks panel.",
          ],
          correctIndex: 1,
          explain: "The canvas is the live prototype — clickable, interactive, real. The Design Files tab shows the code behind it; Tweaks lets you fine-tune cosmetics.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## The chat panel\n\nDon't forget about the chat panel on the left. It looks quiet right now because you're past the questions phase, but it's where the next round of iteration happens. The input box at the bottom that used to say *\"Describe what you want to create...\"* is now an input box for changes — telling Claude Design what to add, fix, or rebuild. The next lesson is about that loop.\n\nFor now, take a few minutes and play. Click into the canvas and use your prototype the way a real user would. Open the file browser once, look at what's there, close it. Open the Tweaks panel and change at least one thing — color, density, anything — just to feel how immediate it is. When you've done all three, you're ready for the next lesson.",
        },
      },
    ],
  },
  {
    moduleNumber: 1,
    lessonNumber: 3,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## Drop the instinct to plan\n\nMost people, the first time they sit down with Claude Design, get stuck before they ever start typing. They look at the prototype, decide it's not quite right, and then freeze because they don't know what to ask for next. They feel like they need to figure out the *full* answer before they say anything.\n\nThat's the wrong instinct. Drop it now and the rest of this gets dramatically easier.\n\nYou don't need to know what you want. You need to know what's wrong with what you're looking at.\n\nThose are different jobs. The first one — knowing what you want — is hard. It's the kind of thing professional designers spend years learning to do from a blank page. The second one — knowing what's wrong with something already in front of you — is something you do effortlessly every day. You walk into a room and notice the lamp is in the wrong corner. You read an email and feel that one sentence is off. You don't need a framework for that. You just react.\n\nClaude Design is built for the second job, not the first. It already gave you something. Your only job now is to react to it.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## How the loop works\n\nLook at your prototype. Find one thing that's wrong, missing, or off. Just one. Don't make a list. Don't try to spot everything. Pick one.\n\nThen go to the chat panel on the left and describe that one thing in plain language. The way you'd describe it to a coworker leaning over your shoulder.\n\nIt looks like this:\n\n> *\"The cards are too big — I want to see more of them on the screen at once.\"*\n>\n> *\"There's no way to mark something as done. Add a checkbox or a button.\"*\n>\n> *\"The colors feel too corporate. Make it warmer — earth tones instead of blue.\"*\n>\n> *\"Move the search bar to the top of the page, where I'd actually look for it.\"*\n\nHit Send. Claude Design changes the thing. Sometimes it asks a clarifying question first — answer it casually, the same way you'd answer a question from a friend. Then look at what came back.\n\nNow do it again. Find the next wrong thing. Send. Repeat.\n\nThat's the entire loop. It's not glamorous and it's not complicated. It's the work.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Two kinds of iteration\n\nYou have two ways to change your prototype.\n\nThe chat panel handles big changes — anything that needs new content, new behavior, new pages, new logic. *Add a calendar view. Let me filter by category. Show me the user's name in the corner.* These are conversations.\n\nThe Tweaks panel on the right handles fine-tuning — color, density, layout, spacing, the size of the cards, the style of the logo. These are clicks. Drag a slider. Pick an option from a dropdown. Watch the prototype update.\n\nThe wrong move is to use the chat for things the Tweaks panel handles. Don't write *\"make the cards smaller and use four columns instead of three\"* in chat when there are sliders right there for it. The chat is too slow for that and the result is less precise. Use the panel.\n\nThe other wrong move is the opposite — trying to fight a big structural change with the Tweaks panel. If you need a whole new section, a new feature, or a different page, that's a chat job. Don't go hunting through dropdowns for it.\n\nYou'll feel the difference quickly. When something is in the panel, the panel is faster. When it isn't, you write a sentence.",
        },
      },
      {
        type: 'workflow_sorter',
        payload: {
          bucketLeft:  { id: 'tweaks', label: 'Tweaks panel' },
          bucketRight: { id: 'chat',   label: 'Chat' },
          tasks: [
            { id: 't1', label: 'Change the color from blue to warm earth tones', answer: 'tweaks', why: 'Cosmetic — there\'s a slider for it. Faster than a sentence.' },
            { id: 't2', label: 'Add a calendar view to the dashboard',            answer: 'chat',   why: 'New feature with new behavior. That\'s a conversation.' },
            { id: 't3', label: 'Make the cards smaller to fit more on screen',    answer: 'tweaks', why: 'Spacing and density live in the panel as dropdowns or sliders.' },
            { id: 't4', label: 'Add a way to filter results by category',          answer: 'chat',   why: 'New logic that didn\'t exist before. Tweaks panel won\'t have a slider for that.' },
            { id: 't5', label: 'Switch from 3 columns to 4 columns',              answer: 'tweaks', why: 'Layout is a panel job. Don\'t write a sentence when there\'s a click.' },
            { id: 't6', label: 'Show the user\'s name in the corner of every page', answer: 'chat', why: 'Content + structure change across pages. That\'s chat territory.' },
          ],
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Reference materials surface naturally\n\nHere's something that surprises people the first time it happens. As you iterate, you'll start hitting moments where Claude Design is making things up.\n\nMaybe it invented a category for your products that doesn't actually exist in your business. Maybe it's showing fake numbers in a way that doesn't match how you actually count things. Maybe it built a workflow with steps your real workflow doesn't have, or skipped steps your real workflow needs.\n\nThat's not a bug. Claude Design is filling in plausible details because you didn't give it the real ones. The fix isn't to argue with it in chat. The fix is to show it the real thing — the actual document, the actual screenshot, the actual list. That's Lesson 4's whole topic and you'll hit it when you hit it.\n\nFor now, just notice when it happens. The moment you find yourself typing *\"actually, the way it really works is...\"* — stop. That's a signal. You're about to describe in words something you could just upload.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Don't try to make it perfect in one round\n\nA common trap: getting one thing fixed, then immediately trying to fix everything else in the next prompt, then getting frustrated when the next version misses three of the five things you asked for.\n\nThe reason that happens is mechanical. Big prompts produce loose changes. Small prompts produce precise ones. If you ask for five things at once, Claude Design has to make tradeoffs you can't see, and some of them will land wrong.\n\nThe fix is the same fix you'll use forever as a builder: one thing per round. It feels slower. It isn't. The version you get to in five small rounds is closer to right than the version you get to in one giant round, every single time.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## When to stop iterating\n\nYou'll know. The prototype starts feeling like the thing you actually want to build instead of a rough sketch of it. The corrections get smaller. You stop spotting major things wrong and start spotting nitpicks.\n\nThat's the signal. Lesson 5 is about what to do at that moment. Don't keep iterating past it — at some point you'll start fighting yourself, undoing changes, getting precious about details that don't matter yet.\n\nFor now, just keep reacting. Find one wrong thing. Fix it. Find the next. The clarity you didn't have when you started is going to show up about ten rounds in, and you won't have planned for any of it.",
        },
      },
    ],
  },
  {
    moduleNumber: 1,
    lessonNumber: 4,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## The signal\n\nYou're a few rounds into iterating. The prototype is closer to what you want, but something keeps going sideways. Claude Design has invented a rule that doesn't match how things actually work. Or it's showing fake data that's almost right but not quite. Or you've corrected the same detail three times and it keeps drifting back to wrong.\n\nThis is the lesson where you stop typing and start uploading.\n\nYou're about to type *\"actually, the way it really works is...\"* followed by a long explanation. Or *\"no, that field should be...\"* followed by a definition. Or *\"the form has the following sections...\"* followed by a list.\n\nStop typing.\n\nIf you have to *describe in words* something that already exists as a document, a form, a screenshot, or a spreadsheet — you're doing the wrong job. Words are lossy. The real thing isn't.\n\nClaude Design reads files. Real PDFs, real images, real spreadsheets, real screenshots. When you upload one, Claude Design works from the actual content instead of from your description of it. That's almost always closer to right.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## How to upload\n\nThere are two places you can put a file, and they do slightly different things.\n\n**Drop a file directly into the chat panel.** Drag a PDF, image, or document straight onto the chat input box on the left. It attaches to your next message. Type whatever change you want — *\"use this as the rule for how invoices get categorized\"* or *\"build the form to match this screenshot\"* — and send. Claude Design treats the file as the authoritative source for what you're asking about.\n\n**Drop a file into the canvas.** The canvas has a drop zone at the bottom — *\"DROP FILES HERE — Images, docs, references, Figma links, or folders — Claude will use them as context.\"* Use this when you're adding reference material for the project as a whole, not for a single change. Things you drop here become part of the project's context and Claude Design can refer back to them across multiple iterations.\n\nFor most early uploads, the chat panel is the right answer. It's tied to the specific change you're making.",
        },
      },
      {
        type: 'workflow_sorter',
        payload: {
          bucketLeft:  { id: 'upload',   label: 'Upload the real thing' },
          bucketRight: { id: 'describe', label: 'Describe in words' },
          tasks: [
            { id: 't1', label: 'Your prototype involves the actual invoice categorization rules from your company policy', answer: 'upload',   why: "Upload the policy document. Don't paraphrase it — the document is the authoritative source." },
            { id: 't2', label: 'You want to change the color of the header from blue to green',                           answer: 'describe', why: 'Cosmetic, no real-world reference exists. One sentence is enough.' },
            { id: 't3', label: 'The form should match the exact fields, order, and section breaks of your paper intake form', answer: 'upload', why: 'Take a photo or PDF of the real form. Claude will see all of it — labels, order, sections — at once.' },
            { id: 't4', label: 'You want a "Welcome" message to greet new users',                                        answer: 'describe', why: 'Generic, low-stakes content. Chat handles it in one go.' },
            { id: 't5', label: 'The data should look like the export from your existing CRM system',                     answer: 'upload',   why: 'A few rows of real data teaches Claude more than a paragraph of explanation.' },
            { id: 't6', label: 'You spot a layout bug — two cards overlapping in a weird way',                           answer: 'upload',   why: 'Screenshot it. The picture does the work for you. One sentence + image beats three paragraphs of description.' },
          ],
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What to upload\n\nThe rule is simple: upload the real thing instead of describing it.\n\nIf your prototype involves rules, upload the actual rule document. The PDF, the policy page, the regulation, the company handbook section — whatever defines the rules in the world your idea lives in. Don't paraphrase it. Don't summarize it. Hand over the document.\n\nIf your prototype involves forms, upload pictures or PDFs of the actual forms. The fields, the labels, the order, the section breaks — Claude Design will see all of it and build the digital version to match.\n\nIf your prototype involves data, upload a real example. A spreadsheet, an export, a screenshot of how the data looks in whatever system holds it today. A few rows of real data teaches Claude Design more than a paragraph of explanation.\n\nIf your prototype involves a workflow that already exists in some other tool — a current system, a paper process, a competitor — upload screenshots of that. Don't try to describe what the screen looks like. Show it.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## The screenshot habit\n\nThere's a second move that pairs with uploading documents, and it's just as important.\n\nWhen something looks wrong on the screen, screenshot it. Drag the screenshot into the chat. Type one sentence about what's wrong. Send.\n\nThat's it. You don't need to describe the position, the size, the color, the broken layout, the missing element. Claude Design can see the picture. *\"This card is overlapping this other card\"* with a screenshot is faster and more accurate than three paragraphs of explanation without one.\n\nThis is going to feel almost too easy. Trust it. The screenshot does most of the work for you.\n\nA few moments where the screenshot habit pays back the most:\n\n- The layout looks broken on your screen but you can't quite describe how.\n- A specific element — a button, a card, a section — is wrong and you don't know the technical name for it.\n- Something works on your laptop but breaks on your phone, or the other way around.\n- You see something visually weird and can't tell if it's a mistake or intentional.\n\nScreenshot it. Drop it in. One sentence. Send.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What this skill becomes\n\nThis isn't just a Module 1 thing. The capture-and-share habit you're building right now — drop the real document in, screenshot what's broken, send it with one line — is the single most important skill you'll use across the whole rest of the course.\n\nWhen you get to Module 3 and you're looking at error messages from Claude Code, you'll screenshot them and send them. When you get to Module 4 and a deploy fails, you'll screenshot the failure logs and send them. When you get to Module 5 and the backend isn't connecting to the database, you'll screenshot whatever you can see and send it.\n\nYou don't have to understand any of it. You just have to capture it. Capture is the skill. Understanding is something Claude does on the other side.\n\nIf you only learn one thing in this whole course, learn this. Most people who get stuck building software get stuck because they're trying to describe in words something that's already on their screen. The fix is always the same: capture what's there, drop it in, ask for the fix.",
        },
      },
    ],
  },
  {
    moduleNumber: 1,
    lessonNumber: 5,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## \"Good enough\" is a real thing\n\nYou've been iterating. The prototype is starting to feel like the thing you actually want to build instead of a sketch of it. The corrections are getting smaller. You're spotting nitpicks instead of missing pieces.\n\nThat's the moment.\n\nThis lesson is about recognizing it, then doing the one thing that turns your prototype into something you can keep building on outside Claude Design.\n\nA lot of builders, the first time they get here, don't stop. They keep iterating. They want it to be perfect before they call it done. They've been having fun shaping it and they don't want to leave the conversation.\n\nDon't do that. The prototype isn't supposed to be the finished product. It's supposed to be a clear-enough version of your idea that you can do real work on top of it — adding features, hooking up real data, deploying it so other people can use it. All of that happens in the next modules, not this one.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## The three criteria\n\n\"Good enough\" means three things, all at once:\n\n- **The shape is right.** The major sections, screens, or features you imagined are there. Not polished. Just present.\n- **The biggest wrong things are fixed.** The stuff that made you say \"no, that's not how it works\" the first few rounds — those are corrected.\n- **What's left is small.** Color tweaks. Wording. Tiny layout adjustments. Things you could spend an hour on or skip entirely without changing what the thing fundamentally *is*.\n\nIf all three are true, you're done with Module 1. Stop iterating. Move on. You will revisit and improve every part of this later — that's what the rest of the course is.\n\nIf only two are true, do one or two more rounds. Then check again.",
        },
      },
      {
        type: 'quick_check',
        payload: {
          question: "Your prototype has all the screens. The big wrong things are fixed. You're now spending time on tiny color tweaks and wording. What do you do?",
          choices: [
            "Keep iterating until every nitpick is gone.",
            "Stop. Ship Module 1 and move on. You will revisit every part of this later.",
            "Start over with a fresh prototype to get the colors right.",
          ],
          correctIndex: 1,
          explain: "Right. All three criteria for 'good enough' are met. Keep going past this point and you'll fight yourself, undo changes, get precious. Stop and move on to Module 2.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Ask for the package\n\nOnce you're at \"good enough,\" go to the chat panel and type something like this:\n\n> *\"Package all of this into a downloadable zip file I can keep working on. I want to take it out of Claude Design and continue building it as a real project.\"*\n\nOr shorter:\n\n> *\"Give me a downloadable version of this project. I want to keep building on it outside Claude Design.\"*\n\nSend it.\n\nClaude Design will package the project — all the components, stylesheets, scripts, and supporting files you saw in the file browser — into a single ZIP file you can download to your computer.\n\nThat ZIP is the bridge. Everything from Lesson 2 onward — the canvas, the file browser, the Tweaks panel — was Claude Design's house. Now you're taking the project out of that house. From this point on, your prototype is a folder of files on your computer. It belongs to you. You can open it anywhere, on any computer, and keep working on it.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Save the ZIP somewhere you'll find it\n\nDownload the ZIP. Move it to a place on your computer where you can find it again — your Desktop, your Documents folder, wherever you keep work you're going to come back to. Don't unzip it yet. Module 2 covers what to do with it next, and the first step of Module 2 is going to ask you exactly where this file lives.\n\nDon't close your Claude Design project either. Keep the browser tab open or bookmark the project URL. You'll want the ability to come back to the live prototype as a reference — to see the visual version of what you're working on, or to ask Claude Design for one more change if you discover something missing later.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What you have right now\n\nTake a moment.\n\nWhen you opened Lesson 1, you had an idea. Maybe a clear one, maybe a vague one. You typed it as one sentence into a tool you'd never used before.\n\nNow you have a working interactive prototype of that idea. It runs. You can click in it. You can show it to somebody and have them understand what you're building. The biggest wrong things are corrected. The shape matches what's in your head. You have a downloadable ZIP of the whole thing sitting on your computer.\n\nThat's what Module 1 was for. You did it.\n\nModule 2 is about taking that ZIP and turning it into a real project — one that lives on the internet, one you can deploy, one other people can use. The shape of the work changes a little. You'll meet some new tools. The skills you've already built — typing casually, reacting to what you see, capturing what's in front of you, uploading the real thing — all carry forward. None of it gets harder than what you just did.\n\nWhen you're ready, open Module 2.",
        },
      },
    ],
  },
];

export async function runSeedBlocks(): Promise<{ updated: number }> {
  let updated = 0;

  for (const entry of BLOCK_ENTRIES) {
    const mod = await prisma.module.findUnique({ where: { number: entry.moduleNumber } });
    if (!mod) {
      console.warn(`Module ${entry.moduleNumber} not found — skipping lesson ${entry.lessonNumber}`);
      continue;
    }

    const lesson = await prisma.lesson.findUnique({
      where: { moduleId_number: { moduleId: mod.id, number: entry.lessonNumber } },
    });
    if (!lesson) {
      console.warn(`Lesson ${entry.lessonNumber} in Module ${entry.moduleNumber} not found — skipping`);
      continue;
    }

    await prisma.lesson.update({
      where: { id: lesson.id },
      data: { content_blocks: entry.blocks as object[] },
    });

    console.log(`Updated content_blocks for Module ${entry.moduleNumber}, Lesson ${entry.lessonNumber}: ${lesson.title}`);
    updated++;
  }

  console.log(`\nSeed-blocks complete. Updated content_blocks for ${updated} lesson(s).`);
  return { updated };
}

if (require.main === module) {
  runSeedBlocks()
    .catch((e) => {
      console.error('seed-blocks failed:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
