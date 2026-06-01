import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type ContentBlock =
  | { type: 'markdown';        payload: { md: string } }
  | { type: 'quick_check';     payload:
      | { question: string; mode?: 'graded'; choices: string[]; correctIndex: number; explain: string }
      | { question: string; mode: 'self_assess'; options: { text: string; explain: string }[] } }
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
          md: "## What this is going to feel like\n\nFaster than you expect, and weirder than you expect. You'll describe an idea in plain English and Claude will hand you something working in under a minute. The first few times that happens it doesn't quite register. Then it does, and the thing that changes is what you allow yourself to build. The friction that used to stop you — \"I can't build that, I'd have to learn to code\" — stops being friction. That's the actual unlock.\n\nTake your time. Don't skip lessons. The course gets harder, not easier, but each lesson lands better when the one before it landed well.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## One skill you'll keep coming back to\n\nThere's one move you'll use more than anything else in this course. It has a name — *capture, don't guess* — and you'll see it taught properly in Module 1 Lesson 4. The short version: when you're stuck, confused, or staring at something you don't recognize, you don't try to describe it in words and you don't go Googling. You screenshot what's on your screen, paste it into Claude, and ask one short question. Capture is the skill. Understanding is something Claude does on the other side.\n\nYou don't need to do anything with this yet. Just know it's coming, and that every time the course later says \"screenshot it and ask Chat,\" this is what it's pointing at.\n\nWhen you're ready, move on to Lesson 2.",
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
  {
    moduleNumber: 2,
    lessonNumber: 1,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## Before you start\n\nModule 2 is the hardest part of this course. I'll tell you that upfront because I want you to expect it.\n\nWhen I built LuKaiAI myself, the dashboards in this module — GitHub, Claude Code, the terminal on my computer — took me longer than anything else. Longer than learning Claude. Longer than deploying. Longer than the database work later. The frustration was real. Most of what I struggled with wasn't hard *information* — it was that the dashboards weren't designed for someone like me.\n\nThey're not designed for someone like you either. That's not your fault. It's the fact of the tools.\n\nHere's what you're walking into:\n\n- **GitHub** wants you to know what a repository is, what a commit is, what a branch is. You don't, and you don't need to. The course teaches what to click without teaching the theory underneath.\n- **The terminal** is going to look unfamiliar. It's an older interface — a text window where you type commands. Most apps on your computer don't work this way. The terminal does.\n- **Claude Code** is a tool you'll install on your computer that talks to your files directly. It's different from Claude Chat. Both exist. Both matter. The course shows you which is which.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Two rules for this module specifically\n\n**Rule 1: Use the capture-and-ask loop more here than anywhere else in the course.**\n\nEven when you think you should know what to do — when a button is \"obviously\" somewhere or a step \"should\" be simple — screenshot what you see and ask Claude Chat. A 30-second screenshot saves 20 minutes of confused clicking. The loop is your shortcut, not your last resort.\n\nIf you've been clicking around for more than five minutes without progress, that's the signal to capture. Don't push through. The loop is faster.\n\n**Rule 2: If you've been stuck on one lesson for more than an hour, stop and come back tomorrow.**\n\nThe breakthrough usually comes when you're not trying. Closing the laptop and coming back fresh isn't quitting — it's discipline. Every builder I know has a story about staring at the same error for an hour, walking away, coming back, and seeing the fix in thirty seconds.\n\nComing back the next day with fresh eyes is part of how this works.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What you don't have to be\n\nYou don't have to be wired like a founder to complete this module. You don't have to push through frustration with grit and willpower. You don't have to \"figure things out on your own.\"\n\nWhat you have to do is trust the loop: screenshot what you see, drop it into Claude Chat, ask one short question. The loop does the work. You don't have to know the answer — you have to know how to ask.\n\nMost people who give up on building software give up here, in modules that look like this one. They blame themselves: *\"I'm not technical enough.\"* They were stuck on something the loop could have solved in two minutes.\n\nIf you use the loop, you don't get stuck.\n\n---",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## You have a ZIP. You won't use it directly.\n\nAt the end of Module 1, Claude Design handed you a ZIP file. **You don't actually open it.** It's a backup — proof that your prototype's code exists on your computer if you ever need it.\n\nThe real flow is: GitHub holds your project, Claude Code reads it from GitHub, and you make changes through Code. The ZIP just sits in your Downloads folder as insurance.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What we're doing in Module 2\n\nIn six short lessons, you'll:\n\n1. Save the ZIP somewhere you can find it (this lesson — 30 seconds).\n2. Make a GitHub account and an empty repository (Lesson 2).\n3. Open the terminal and learn the two commands you'll use constantly (Lesson 3).\n4. Get Claude Code on your computer (Lesson 4).\n5. Connect Claude Code to GitHub (Lesson 5).\n6. Put your prototype on GitHub for the first time (Lesson 6).\n\nBy the end, your prototype lives on GitHub, and Claude Code runs in your terminal — in your project folder — ready to make changes and push them up. **You drive every change by talking to Code**, and Code keeps GitHub in sync.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Save the ZIP\n\nFind the ZIP in your Downloads folder. Move it somewhere you'll remember — Desktop is fine, or a folder you keep work in.\n\nDon't unzip it. Don't open it. **It's a backup, not a workspace.** Move on to Lesson 2.",
        },
      },
    ],
  },
  {
    moduleNumber: 2,
    lessonNumber: 2,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "You have two jobs in this lesson:\n\n1. Make a GitHub account, or sign in to the one you want this course to use.\n2. Create an empty repository on that account — the home your Module 1 prototype is going to live in.\n\nThe first job has more variations than it looks like — GitHub has redesigned signup several times, asks for two-factor authentication earlier than it used to, and a lot of people already have a stale GitHub account from years ago they've half-forgotten about. The second job is short once you're on the right account, but landing on the *wrong* account at the end of this lesson is the single most common way the next few lessons silently break.\n\nBy the end of this lesson, you'll know your GitHub **username** and your **repo name**. Write them down. Both lessons after this one ask you to remember and verify them.\n\nGitHub is a website where code lives — somebody else's computer, holding your project so it doesn't only exist on your laptop. Every change you make from here on gets pushed there. **If your laptop dies tomorrow, your project doesn't.** It's free for everything we're doing in this course; you don't need a paid plan, ever.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "> **Don't guess. Capture.**\n>\n> Anytime you're not sure — a button isn't where this lesson said it would be, an unexpected page appears, an error you don't recognize pops up, or you're just looking at a screen and not sure what to click — *you do not need to understand any of it.*\n>\n> Screenshot what's on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what should I click here?\"* or *\"what is this error?\"* Chat will tell you exactly what to do next. Use this loop anytime you're unsure, not only when something is broken.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 1 — Decide which account you're using before you go to github.com\n\nBefore you open a browser tab, decide which of these you are:\n\n- **No GitHub account yet, never had one** → Step 2 (sign up from scratch).\n- **You already have a GitHub account from years ago you can sign back into** → use it. Go to github.com, click **Sign in**, and skip to Step 4.\n- **You have a GitHub account through a job or school** → make a *new personal* one for this course. Your work account often has scope restrictions you can't see, and the course assumes a regular personal account. Don't use the work one.\n\n*If you can't remember whether you ever made one, type the email addresses you commonly use into github.com's password reset page — if GitHub recognizes one, the account exists. If none of them are recognized, you don't have an account yet.*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 2 — Sign up at github.com\n\nOpen **github.com** in a browser tab. Click **Sign up** in the top-right.\n\nYou'll need three things:\n\n1. **An email you actually check.** GitHub sends a verification link in a minute; if you use a throwaway, you'll be stuck waiting on an email you'll never click.\n2. **A password.** Long is more important than complicated. Use a password manager if you have one.\n3. **A username.** This becomes part of your project's URL forever — *github.com/yourusername/yourreponame* — so pick something you're okay with being public. Letters, numbers, and hyphens are allowed; spaces and most special characters are not. Hyphens can't be at the start or end. Common short names are already taken.\n\n*If GitHub says the username you tried is unavailable, it's gone — somebody has it. Add a number, a hyphen, the year, or your initials and try again. GitHub will sometimes suggest variations directly. The username doesn't need to be clever; it needs to be yours and memorable.*\n\nGitHub will walk you through a few more steps after that — country, an age confirmation, a puzzle captcha. Answer them honestly. The puzzle captcha can take a couple of tries; that's the puzzle being finicky, not you doing it wrong.\n\n*If you hit a captcha loop where it never seems to accept your answer, refresh the page and try a different browser, or turn off any VPN or strict-tracking extension you have running. Captchas are often the thing those tools break.*\n\nGitHub then asks a few survey questions about why you're signing up. Pick any answers — they don't change anything about your account.",
        },
      },
      {
        type: 'screenshot',
        payload: {
          slotId: "gh-signup",
          src: "/images/lessons/gh-signup.png",
          alt: "GitHub signup page at github.com/signup, with email, password, username, and country fields visible on the right side of the screen.",
          caption: "GitHub signup page at github.com/signup. The form on the right is where you create your account.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 3 — Verify your email\n\nGitHub sends a verification email to the address you used. Open it and click the link. **You now have a GitHub account.**\n\n*If the email doesn't arrive within five minutes: check your spam or promotions folder. If it's not there either, go back to github.com (you should be signed in) and look for a yellow banner near the top offering to resend the verification email. Click that. If it still doesn't arrive, screenshot what you see and ask Claude Chat \"GitHub isn't sending me a verification email — what do I do?\"*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 4 — Note your username, and check it's right\n\nThis is the small step everyone skips and regrets later.\n\nAfter you sign up (or sign in), look at the **top-right corner** of any GitHub page. There's a small circle there — your avatar — and clicking it shows your username at the top of the menu that opens.\n\n**Write that username down somewhere you'll find again** — a sticky note, your password manager, the back of an envelope. The next lesson asks you to authorize Claude Code against this exact account, and the lesson after that pushes code to a repo on this exact account. If you forget which username you used, both of those lessons break in confusing ways.\n\n*If GitHub is offering to enroll you in two-factor authentication right now, you can do it later from Settings — but if you choose to do it now, the most important thing is to save the recovery codes GitHub shows you. Screenshot them or write them down. If you ever lose access to your 2FA app and you don't have the recovery codes, GitHub cannot get your account back for you.*\n\n*If the username in the corner doesn't match what you thought you signed up as, you're probably signed in to a different account that was already in this browser. Click your avatar → **Sign out** → then sign back in with the account you just created.*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 5 — Create your first repository\n\nA *repository* — \"repo\" for short — is one folder GitHub holds for you. One per project. You're going to make the one for what you built in Module 1.\n\n1. In the top-right of any GitHub page, click the **+** button.\n2. Pick **New repository** from the dropdown.\n3. **Owner** — make sure the dropdown shows *your personal username*, not an organization. If you've ever been added to a GitHub org through work, the Owner field can default to the org and your repo will land somewhere you can't find later. Personal username, not org.\n4. **Repository name** — something short, lowercase, hyphens-okay, no spaces. The name of your project from Module 1 is the right answer.\n5. **Description** — optional. Skip it or write one sentence.\n6. **Public** or **Private** — for this course, **Public** is the simpler default. It means anyone with the URL can see your code, which is normal for learning projects and lets you share a link if you want to. Private works too, but a few things later in the course (preview links, certain free-tier features) are smoother on public repos. You can flip it later from Settings.\n7. **The three checkboxes at the bottom** — *Add a README*, *Add .gitignore*, *Choose a license* — **leave all three unchecked.** Your prototype already has its own files, and adding these will cause headaches in Lesson 6 when you try to push.\n8. Click the green **Create repository** button.\n\n*If GitHub says the repo name is already in use, you've probably got an older repo on this account with the same name from a previous attempt. Either delete the old one (Settings on that repo → Danger Zone → Delete) or pick a different name and remember the new one. If the **+** button isn't in the top-right where this lesson says, GitHub may have redesigned the create flow since this was written. Screenshot what you see and ask Claude Chat \"where do I create a new repo on GitHub?\"*\n\n*The Quick-Navigate reference at `curriculum/reference/QUICK-NAVIGATE.md` lists GitHub's main URLs and dashboard buttons if the layout doesn't match what you're seeing.*",
        },
      },
      {
        type: 'screenshot',
        payload: {
          slotId: "gh-new-repo",
          src: "/images/lessons/gh-new-repo.png",
          alt: "GitHub's Create a new repository page with fields for repository name, owner dropdown, public/private radio buttons, and the three initialization checkboxes (Add a README, Add .gitignore, Choose a license).",
          caption: "GitHub's Create a new repository page. The form is where you name your repo and pick public or private. Leave the three init checkboxes at the bottom unchecked.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 6 — Confirm what landed\n\nThe page that loads after you click Create is mostly empty — a header with your repo's URL, some setup instructions you can ignore, and a big code block titled *Quick setup*. **Ignore all of it.** Claude Code is going to handle the pushing in Lesson 6; you don't run any of these commands by hand.\n\nLook at the very top of the page. It should say *yourusername / yourreponame*. That URL — `github.com/yourusername/yourreponame` — is what you're going to point Claude Code at two lessons from now.\n\n*If the page didn't change after you clicked Create — it just sat there — the form may have hit a slow network. Wait fifteen seconds, then refresh. If the repo still doesn't exist, scroll back up and look for a red error banner at the top of the form. Screenshot it and ask Claude Chat.*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### What you have now\n\n- A GitHub account with a confirmed email, on a personal username you've written down.\n- An empty repo at `github.com/yourusername/yourreponame` — no README, no .gitignore, no license, ready for your Module 1 code to land in it.\n- A note somewhere with your **username** and **repo name**. You need both in Lesson 5 (account check) and Lesson 6 (push target).\n\nLeave this GitHub tab open. Move to Lesson 3.",
        },
      },
      {
        type: 'checklist',
        payload: {
          items: [
            { id: 'signed-up', label: 'Signed up at github.com' },
            { id: 'verified-email', label: 'Verified your email' },
            { id: 'created-repo', label: 'Created a new repository with all three checkboxes unchecked' },
            { id: 'noted-username', label: 'Wrote down your username and repo name' },
          ],
        },
      },
    ],
  },
  {
    moduleNumber: 2,
    lessonNumber: 3,
    blocks: [
      {
        type: 'quick_check',
        payload: {
          question: "How comfortable are you with the terminal (or command prompt)?",
          mode: 'self_assess',
          options: [
            { text: "I've never opened it.", explain: "Perfect. The terminal is one of those things that looks scary but isn't. Read the rest of this lesson carefully — every step matters, and by the end you'll feel like you've always known how to use it." },
            { text: "I've opened it once or twice but don't really get it.", explain: "Good — you have the lay of the land. Skim the first few sections and pay close attention to the 'Two commands you'll use constantly' block. That's where the real value lives for you." },
            { text: "I'm comfortable with terminal.", explain: "Great. Scroll to 'Try it yourself' and confirm the commands work the way you expect. Otherwise this lesson won't teach you anything new — meet you in Lesson 4." },
          ],
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What the terminal is\n\nThe terminal is a window where you type instructions to your computer instead of clicking on icons. Plain background, blinking cursor, text only. **That's the whole thing.**\n\nFor decades before computers had pretty interfaces, this was the *only* way to use them. Now it's still the fastest way to do certain kinds of work — running code, installing tools, working with git, talking to Claude Code. Anything you'll do in this course from here forward uses the terminal.\n\nYou don't need to memorize commands. You'll learn five or six and use those five or six for years. **Everything else, you'll Google or ask Chat.**",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Why it's not scary\n\nYou can't break your computer by typing in terminal. The worst thing that happens when you type something wrong is an error message — Claude Code, your operating system, or git will refuse to do something dangerous. They don't silently destroy things.\n\nA few rules that make the terminal feel safer:\n\n- **You're not committing to anything by pressing Enter.** Most commands are read-only or show information. Commands that change things are usually obvious about it.\n- **You can copy and paste freely.** The terminal accepts pasted text. We'll lean on this throughout the course.\n- **If you don't know what a command does, don't run it.** Same rule as anywhere else on the internet. If Chat or a friend sends you a command, ask what it does before pasting.\n\nThat's it. Terminal isn't a secret world — it's just a different door into the computer you already own.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## How to open it\n\n**Mac:**\n1. Press `Cmd + Space` (the keyboard shortcut for Spotlight Search)\n2. Type `terminal`\n3. Press `Enter`\n\nA window opens with text like `papabear@MacBook-Pro ~ %` — that's your prompt. The blinking cursor next to it is where you'll type.\n\n**Windows:**\n1. Press the `Windows` key (the one with the Windows logo)\n2. Type `terminal` (if \"Windows Terminal\" appears, pick that; if it doesn't, use \"Command Prompt\" — both work for this course)\n3. Press `Enter`\n\nA window opens with text like `C:\\Users\\YourName>` — that's your prompt. Same idea: cursor next to the `>` is where you type.\n\n**On both:** the part before the `%` or `>` is just identification — your username, your computer name, and your current folder. You can ignore the formatting. What matters is the space after that mark.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Two commands you'll use constantly\n\nThere are two terminal commands you'll use over and over in this course. Just two. Learn them once, use them forever.\n\n**`cd` — move into a folder.** Stands for \"change directory.\" Type `cd` followed by a space and a folder name to move into that folder.\n\nCode example: `cd Documents`\n\nAfter pressing Enter, your prompt updates to show you're now inside the `Documents` folder. Your prompt becomes something like `papabear@MacBook-Pro Documents %` (Mac) or `C:\\Users\\YourName\\Documents>` (Windows).\n\nTo move *back out* of a folder, type `cd ..` (two dots). That means \"go up one level.\" Press Enter, and you're back where you were.\n\n**`pwd` (Mac) or `cd` with nothing after it (Windows) — see where you are.** Sometimes you lose track of which folder you're in. This command prints the full path so you know.\n\nCode example: `pwd`\n\nThat's the whole vocabulary for now. `cd` to move, the printout to check. The rest of the course teaches you what to do once you're in the right folder.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "> **Don't guess. Capture.**\n>\n> Anytime you're not sure what you're looking at in the terminal — *anytime* — screenshot the window and ask Chat. Same failsafe as every other lesson. \"What does this error mean?\" \"Did this command work?\" \"Why does my prompt look different?\" — all valid questions.\n>\n> The terminal looks different from any other app on your computer. That's by design — it's an older interface. Don't try to interpret it on your own. Capture what you see, ask Chat, follow the answer.\n>\n> **This loop has solved every terminal problem I have ever had.** It will solve yours too.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Try it yourself\n\nOpen your terminal right now. Try these three things in order:\n\n1. **See where you are.** Type `pwd` (Mac) or `cd` (Windows) and press Enter. Read the output. That's the folder your terminal is currently \"in.\"\n2. **Move to Documents.** Type `cd Documents` and press Enter. Your prompt updates. Now type `pwd` (or `cd`) again — confirm you're in Documents.\n3. **Move back.** Type `cd ..` and press Enter. You're back where you started.\n\n**If something didn't work** — the command did nothing, you got an error, your prompt looks different — screenshot the terminal window and drop it into Claude Chat. Type *\"is this right?\"* and Chat will tell you.\n\nThis is the muscle. The rest of Module 2 uses it.",
        },
      },
    ],
  },
  {
    moduleNumber: 2,
    lessonNumber: 4,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "Two jobs in this lesson:\n\n1. Install Claude Code by running one command in your terminal\n2. Sign in to it for the first time\n\nThe install is one line. The sign-in is the same Claude account you made in Module 0. This is shorter than it sounds.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### What you're about to do\n\nClaude Code is a tool that lives in your terminal. It's not an app you click an icon to open — it's a command you run. After this lesson, you'll have a `claude` command available in your terminal. Type `claude` from any folder and Claude Code starts up in that folder, ready to work on whatever's there.\n\nThe install adds the `claude` command to your computer. That's it. No icons in your dock, no new app to find. The terminal you opened in Lesson 3 is where Claude Code lives.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 1 — Open your terminal\n\nIf your terminal isn't already open from Lesson 3, open it now. Same instructions as before:\n\n- **Mac:** Press `Cmd + Space`, type `terminal`, press Enter.\n- **Windows:** Press the `Windows` key, type `terminal`, press Enter.\n\nYou should see a prompt — `papabear@MacBook-Pro ~ %` on Mac, `C:\\Users\\YourName>` on Windows. The blinking cursor next to that prompt is where you'll type.\n\nIf your terminal isn't behaving like that — screenshot what you see and ask Chat. Lesson 3 covered the terminal in depth; if you skipped it, go back.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 2 — Paste the install command\n\nYou're going to paste **one line** into your terminal. Different command for each operating system. Use the one that matches your computer.\n\n**Mac or Linux:**\n\n```\ncurl -fsSL https://claude.ai/install.sh | bash\n```\n\n**Windows (PowerShell):**\n\n```\nirm https://claude.ai/install.ps1 | iex\n```\n\n*Note for Windows users: if you're using Command Prompt instead of PowerShell, switch to PowerShell. Press the Windows key, type \"PowerShell,\" and open Windows PowerShell. Run the install command there.*\n\nCopy the command for your OS. Paste it into your terminal. **Press Enter.**",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 3 — Watch the install happen\n\nOnce you press Enter, you'll see a lot of text scroll past. That's the installer downloading files, copying them to the right places on your computer, and setting up the `claude` command.\n\n**This is normal.** Don't try to read it. Don't close the terminal. Don't press anything.\n\nThe install takes 30 seconds to 2 minutes depending on your internet speed.\n\nYou'll know it's done when:\n\n- The text stops scrolling\n- You see your normal prompt again (the line ending in `%` or `>`)\n- The cursor is blinking, waiting for your next command\n\n*If you see red error text scroll past, don't panic. Wait until the install finishes (cursor blinking, prompt waiting), then screenshot the whole terminal window and ask Chat: \"the Claude Code install showed errors — what happened?\" Chat will read the errors and tell you the fix.*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 4 — Verify the install worked\n\nType this single command:\n\n```\nclaude\n```\n\nPress Enter.\n\n**If install worked:** Claude Code starts up. You'll see a welcome message, possibly a sign-in prompt, and a new kind of cursor that's waiting for you to talk to Claude Code.\n\n**If install didn't work:** You'll see something like `command not found: claude` or `'claude' is not recognized as an internal or external command`. This means the `claude` command isn't on your computer's PATH yet — a common first-install issue.\n\nThe fix is usually one of two things:\n\n1. **Close your terminal completely and open a new one.** Sometimes PATH changes don't take effect until you start a fresh terminal session. Try `claude` again in the new window.\n2. **If that doesn't work** — screenshot what you see and ask Chat: \"I just installed Claude Code and the `claude` command isn't recognized — what do I do?\" Chat will tell you the specific fix for your OS.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "> **Don't guess. Capture.**\n>\n> If anything during install or first launch looks unexpected — an error message, a permissions dialog, a security warning from your operating system — *don't push past it.* Screenshot what you see, drag it into Claude Chat, and ask \"what is this?\" Chat reads operating-system warnings and installer errors all the time. The fix is almost always one specific instruction.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 5 — Sign in on first launch\n\nThe first time `claude` runs successfully, it asks you to sign in. The sign-in process opens a browser window automatically and walks you through it.\n\n**What you'll see:**\n\n1. A browser window opens (or Claude Code gives you a URL to paste into your browser)\n2. The page asks you to sign in to your Claude account — **use the same email and password you used in Module 0 for Claude Pro**\n3. After signing in, the page says something like \"Authentication successful. You can close this window.\"\n4. Switch back to your terminal — Claude Code should now be signed in and ready to use\n\n**Important:** don't make a new Claude account here. Use the one from Module 0. Your Pro subscription covers Claude Code at no extra cost — but only if it's the same account.\n\n*If you accidentally create a second account, you may run into \"no Pro subscription found\" errors later. Easier fix: sign out of Claude Code (type `claude logout`), then `claude` again, then sign in with the right account this time.*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### What you have now\n\nClaude Code is installed on your computer. The `claude` command works in your terminal. You're signed in with your Pro account.\n\nThis was the hardest install in the course. Backend setup in Module 5 has more moving pieces but they're all dashboards — none of them require pasting commands into a terminal. You've now done the trickiest part.\n\nThe next lesson connects Claude Code to GitHub so it can push code to your repo.",
        },
      },
      {
        type: 'checklist',
        payload: {
          items: [
            { id: 'installed-code', label: 'Pasted the install command and watched it complete' },
            { id: 'verified-claude', label: 'Typed claude in your terminal and saw it start up' },
            { id: 'signed-in', label: 'Signed in with your Claude Pro account' },
          ],
        },
      },
    ],
  },
  {
    moduleNumber: 2,
    lessonNumber: 5,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "You have two jobs in this lesson:\n\n1. Start the authorization flow that lets Claude Code talk to GitHub.\n2. Make sure the connection landed on the *right* GitHub account.\n\nThe first job is straightforward — you type a sentence into Claude Code and it opens a GitHub page. The second job is the one people skip, and it's the single most common reason this lesson appears to succeed and then breaks a lesson or two later. We'll handle both, in order.\n\nYou do this once, ever. After today, every push, every pull request, every interaction Claude Code has with GitHub uses the connection you make in the next ten minutes.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "> **Don't guess. Capture.**\n>\n> Anytime you're not sure — a button isn't where this lesson said it would be, an unexpected page appears, an error you don't recognize pops up, or you're just looking at a screen and not sure what to click — *you do not need to understand any of it.*\n>\n> Screenshot what's on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what should I click here?\"* or *\"what is this error?\"* Chat will tell you exactly what to do next. Use this loop anytime you're unsure, not only when something is broken.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 1 — Start the connection from Claude Code\n\nIn Claude Code, type:\n\n> *\"Connect to GitHub.\"*\n\nThat's literally what you type. Claude Code understands conversational requests. It'll respond with a short message explaining what's about to happen, then either open a browser window for you automatically or hand you a URL to paste into a browser tab.\n\nEither way, you should end up on a GitHub page titled **Authorize Claude Code**.\n\n*If Claude Code opens a browser that isn't the one you usually use for GitHub — for example, Safari opens but you live in Chrome — close that window and paste the URL Claude Code gave you into the browser where you actually use GitHub. If you authorize in a browser you're not signed in to, you'll have to sign in from scratch, and it's easy to accidentally use the wrong account doing it.*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 2 — Before you click anything, check which GitHub account is signed in\n\nThis is the most important step in the lesson. Read it twice.\n\nWhen the Authorize Claude Code page loads, look at the **top-right corner** of the GitHub page. There's a small circle there — your avatar — and clicking it shows your username. **That username is the GitHub account this authorization will use forever.** Not the one you used to sign up. Not the one you \"meant to.\" The one that's signed in right now.\n\nPlenty of people have more than one GitHub account — a personal account and a work account, or an old one they forgot they had. Browsers remember whichever was signed in last. The authorization will succeed against whichever one is showing in that corner, silently, and you won't notice anything is wrong until Lesson 6 when your repo isn't where you expected it.\n\nSo before you click anything else:\n\n1. Look at the top-right avatar.\n2. Confirm the username matches the one you used to create your repo in Lesson 2.\n3. If it doesn't match — or if you see an account picker asking which one to use — sign out of GitHub entirely first (top-right avatar → Sign out), then sign back in with the right account, then return to Claude Code and type *\"Connect to GitHub\"* again to restart the flow.\n\n*If you don't remember which account you used in Lesson 2, open a new tab, go to github.com, and look at your repos. Whichever account owns the repo you created — that's the one you need signed in here.*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 3 — The Authorize page itself\n\nWith the right account confirmed, you're ready to authorize. GitHub will list what Claude Code is asking for — typically read and write access to your repositories, your email, and a few related items.\n\nIt looks like a lot. It is a lot, but it's also exactly what this tool needs to do its job: Claude Code can't push code to your repo without permission to write to your repo. This is the same authorization flow you'd grant any code editor or IDE.\n\nA few things that can happen on this page, none of which are problems:\n\n- **GitHub asks for your password again before showing the Authorize button.** This is called \"sudo mode\" — GitHub re-confirms it's really you before granting a new app access. Enter your password and continue.\n- **GitHub asks for a two-factor code mid-flow.** Enter the code from your authenticator app or the SMS, the flow continues from where it paused.\n- **The green Authorize button is grayed out.** GitHub is still waiting on a password or 2FA step above. Scroll up the page, complete whatever's pending, and the button will activate.\n\n*If the page looks completely different from this description — different headings, different buttons, an error banner — screenshot it and ask Claude Chat \"I'm trying to authorize Claude Code on GitHub, is this right?\" GitHub's pages get redesigned; the capture-and-ask loop is the durable fallback when screenshots don't match.*",
        },
      },
      {
        type: 'screenshot',
        payload: {
          slotId: "cc-github-auth",
          src: "/images/lessons/cc-github-auth.png",
          alt: "GitHub's authorization page showing 'Claude by Anthropic would like permission to' with three permissions listed: verify GitHub identity, know which resources you can access, and act on your behalf. A green Authorize Claude button is at the bottom.",
          caption: "The 'Authorize Claude' page on GitHub. After you type 'Connect to GitHub' in Claude Code, this is what opens in your browser. Click the green Authorize Claude button to connect.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 4 — Choose what repositories Claude Code can touch\n\nNear the bottom of the Authorize page, there's a section about repository access. The two options are usually **All repositories** and **Only select repositories.**\n\n- **All repositories** is faster — Claude Code can see every repo on your account, including any new ones you make later. Good if you're only going to use this account for LuKaiAI work.\n- **Only select repositories** is tighter — Claude Code only sees the repos you explicitly pick. If you choose this, **you have to tick the repo you made in Lesson 2 from the list,** or Claude Code won't see it and Lesson 6 will fail in a confusing way.\n\nYou can change this later either way, so it's not a permanent choice. When you're decided, scroll to the bottom and click the green **Authorize** button.\n\n*If you picked \"Only select repositories\" and want to add or change which repos Claude Code can see later, go to github.com → click your avatar (top-right) → **Settings** → **Applications** (left sidebar) → find **Claude Code** in the list → **Configure** → toggle the repos you want. This is also the place to come if Lesson 6 fails because Claude Code can't find your repo — most of the time it's because the repo isn't ticked here.*\n\n*The Quick-Navigate reference at `curriculum/reference/QUICK-NAVIGATE.md` lists GitHub's main URLs and dashboard buttons if the layout doesn't match what you're seeing.*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 5 — Confirm the connection landed in Claude Code\n\nAfter you click Authorize, GitHub redirects you somewhere — usually a page that says \"Authorization successful\" or a redirect that sends you back to Claude Code automatically.\n\nGo back to your Claude Code window. You should see a confirmation message — something like *\"GitHub connected as @yourusername.\"* **Check that the username in that confirmation matches the account you intended.** This is your last chance to catch a wrong-account authorization before Lesson 6.\n\nIf you don't see a confirmation message within about thirty seconds, type into Claude Code:\n\n> *\"Did the GitHub connection work?\"*\n\nIt'll tell you. If something's wrong, it'll walk you through fixing it.\n\n*If your browser says \"Authorization successful\" but Claude Code never confirms — even after thirty seconds and asking it directly — you're likely on a VPN, in a privacy-strict browser (Brave's shields, Firefox strict mode), or in incognito, any of which can block the callback Claude Code needs. Turn the VPN off, switch to your regular browser window (not incognito), restart from Claude Code's prompt by typing \"Connect to GitHub\" again.*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### What you have now\n\n- Claude Code has GitHub access on the correct account — verified, not assumed.\n- You know how to change which repos it can touch if you need to (Settings → Applications → Claude Code).\n- You know the difference between \"Authorization successful\" in the browser and \"GitHub connected\" in Claude Code — the second one is the one that matters.\n\nNext lesson, you'll use this connection to push your first commit from Claude Code to GitHub. If anything goes sideways there, the fix is almost always in the Settings → Applications → Claude Code page you just learned about.",
        },
      },
      {
        type: 'checklist',
        payload: {
          items: [
            { id: 'typed-connect', label: 'Typed "Connect to GitHub" in Claude Code' },
            { id: 'verified-account', label: 'Checked the top-right avatar and confirmed the right GitHub account is signed in' },
            { id: 'authorized', label: 'Clicked the green Authorize button on github.com' },
            { id: 'saw-confirmation', label: 'Saw the "GitHub connected as @yourusername" confirmation in Claude Code' },
          ],
        },
      },
    ],
  },
  {
    moduleNumber: 2,
    lessonNumber: 6,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## Everything is ready, now we wire it together\n\nYou have a GitHub account with an empty repo (Lesson 2). You know how to use the terminal (Lesson 3). Claude Code is installed (Lesson 4) and connected to your GitHub (Lesson 5). Module 1's ZIP is still sitting in your Downloads folder.\n\nThis lesson puts them all in the same room. By the end, your prototype lives at `github.com/<your-username>/<your-repo-name>` and Claude Code is ready to make changes to it from now on.\n\nWe do this in five steps. Each one is simple on its own.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "> **Don't guess. Capture.**\n>\n> If Claude Code asks a question you don't recognize during the push — what branch to use, whether to add a .gitignore, how to handle a conflict — don't guess. Screenshot what you see, drag it into Claude Chat, ask \"how should I answer this?\" Chat reads it and tells you exactly what to type. **It always works.**",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Step 1 — Give your project a real home\n\nRight now, your project is a `.zip` file in your Downloads folder. ZIP files are compressed — your computer can't really *use* them until they're unzipped.\n\n**Move and unzip the project to your Documents folder.** Here's exactly how:\n\n1. Open Finder (Mac) or File Explorer (Windows).\n2. Go to your Downloads folder.\n3. Find the ZIP file (probably named something like `your-project-name.zip`).\n4. Double-click it. On both Mac and Windows, this unzips the file — you'll see a new folder appear next to the ZIP.\n5. Drag the new folder (not the ZIP — the unzipped folder) into your Documents folder.\n6. **Rename the folder to `lukaiai-project`.** Right-click the folder, choose Rename, type `lukaiai-project`.\n\nYou can put your project anywhere you want and name it anything you want — but for the rest of this course we'll use `Documents/lukaiai-project` as the path. **If you use the same path, everything else in this lesson works without modification.**",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Step 2 — Open terminal in your project folder\n\nOpen your terminal (Lesson 3 reminder — Mac: Cmd+Space, type Terminal; Windows: Windows key, type Terminal).\n\nType this command and press Enter:\n\n```\ncd Documents/lukaiai-project\n```\n\nYour prompt updates to show you're now \"in\" the project folder. **Confirm with `pwd` (Mac) or `cd` (Windows)** — the output should end with `lukaiai-project`.\n\nIf the output doesn't end with `lukaiai-project` — maybe you misspelled the folder name, maybe you put the folder somewhere else — fix it now. Use `cd ..` to go back out, look at your folder structure in Finder/File Explorer, and try the `cd` command with the correct path.\n\n**This is the moment Claude Code will live for the rest of your project.** Get it right.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Step 3 — Start Claude Code inside this folder\n\nWith your terminal still in `lukaiai-project` (don't open a new terminal window — use the same one from Step 2), type:\n\n```\nclaude\n```\n\nPress Enter.\n\nClaude Code starts up. You'll see a welcome message and a prompt where you can type to it. **Claude Code is now \"looking at\" your project folder.** It can see your files, read them, and make changes to them.\n\nA note on what Code shows you: the first time you start Claude Code in a new folder, it might give you a quick summary of what it sees — file names, project type, etc. That's normal. It's confirming what folder it's in.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Step 4 — Tell Code to push to GitHub\n\nNow the actual push. Type this into Claude Code (replace `<username>/<repo-name>` with your real GitHub username and repo name from Lesson 2):\n\n> *\"This folder is the contents of a project I built in Claude Design. Set it up as a new git repository, commit all the files with a message saying 'Initial commit', and push it to my GitHub repo at `<username>/<repo-name>`. Use the main branch.\"*\n\n**Watch what Claude Code does.** It runs a series of git commands — initializing the repo, staging files, committing, adding GitHub as a remote, and pushing. Each command's output scrolls past in your terminal. You don't need to understand the details.\n\nIf Code asks clarifying questions (\"should I include the .git folder?\" \"should I add a .gitignore file for node_modules?\") — answer naturally. *\"Add a sensible .gitignore\"* works for most cases. **If you're not sure, screenshot the question and ask Chat.**\n\nWhen Code reports the push succeeded, move to the next step.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Step 5 — See your files on GitHub\n\nOpen your browser. Go to the GitHub tab you left open from Lesson 2 (or navigate to `github.com/<your-username>/<your-repo-name>`). Refresh the page.\n\nThe empty repo from Lesson 2 is now full. You'll see your project's file names, a green \"Initial commit\" badge, and a commit count of `1`. **Your prototype now exists on GitHub.**",
        },
      },
      {
        type: 'screenshot',
        payload: {
          slotId: "gh-first-push",
          src: "/images/lessons/gh-first-push.png",
          alt: "A GitHub repository page right after the first push, showing the repo name, branch indicator (main), '1 Commit' badge, and a README.md file with the initial commit message.",
          caption: "Your GitHub repo right after the first push. The \"1 Commit\" badge and the file list mean your prototype is now on GitHub.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What you've done\n\nFour hours ago, your idea was a Claude Design chat tab. Now it's a real codebase in a real GitHub repository, with Claude Code installed on your computer and pointed at the right folder.\n\n**From this point forward, the workflow never changes.** Every time you sit down to work on this project:\n\n1. Open terminal\n2. `cd Documents/lukaiai-project`\n3. `claude`\n\nThree commands. Then you describe what you want to change, Claude Code does the work, and pushes the changes to GitHub. Module 3 teaches you how to use this workflow well.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: '---\n\n## Module 2 — Your deliverable\n\nWhen you can check this off, Module 2 is done.',
        },
      },
      {
        type: 'checklist',
        payload: {
          items: [
            { id: 'unzipped-project', label: 'My project is unzipped in `Documents/lukaiai-project`' },
            { id: 'terminal-cd-works', label: 'I can open terminal and `cd` into the project folder' },
            { id: 'claude-starts', label: 'Claude Code starts when I type `claude` in that folder' },
            { id: 'pushed-to-github', label: 'My project files are visible at github.com/<username>/<repo-name>' },
            { id: 'module-2-deliverable', label: 'My prototype lives at github.com/<username>/<repo-name> and Claude Code can read and write to it from `Documents/lukaiai-project`' },
          ],
        },
      },
    ],
  },
  {
    moduleNumber: 3,
    lessonNumber: 1,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## What 'too long' looks like\n\nYou have one Claude Code session open. You ask it to add a feature. It works. You ask it to fix something. It works. You ask it to refactor a section. It mostly works, but it touched two other files. You ask it to undo just *part* of what it did — and it makes things worse.\n\n**This is what 'too long' looks like.** Not a clock. Not a token count. The session piled up requests until each new change is touching the old ones in ways neither of you can predict.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Why this happens\n\nClaude Code is reading the *whole conversation* every time it acts. Every prompt you've sent. Every file it's read. Every error it's seen. The longer a session goes, the more it has to keep track of — and the more chances there are for it to confuse what you asked five minutes ago with what you asked just now.\n\nThe surface symptom: scope creep. Things change that you didn't ask to change. **The real cause: too much state in one place.** The model is doing its best to honor everything you've said and the everything is now too big.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## The mechanical fix\n\nOne task per session. Then close it.\n\nThat's the whole rule. *One thing.* When you finish, close the session and start a fresh one for the next thing. The new session is empty — no memory of what you just did, which means no chance of accidentally undoing it. **Short sessions ship cleanly. Long sessions tangle.**\n\nThis feels wasteful the first few times. It isn't. The cost of restarting is five seconds; the cost of unsnarling a tangled session is an hour.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What 'one task' actually means\n\nA task is: *one thing you could describe in a single sentence and verify in under a minute.*\n\n- *\"Add a search bar to the header\"* — one task.\n- *\"Add a search bar, fix the date format, and refactor the user model\"* — three tasks. Three sessions.\n- *\"Make the login work\"* — too vague to be one task. Break it down first in Chat.\n\nIf you can't write it in one sentence, you're not ready to hand it to Code. Lesson 2 is about why that matters.",
        },
      },
    ],
  },
  {
    moduleNumber: 3,
    lessonNumber: 2,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## Two tools, two jobs\n\nYou have two tools open right now: Claude Chat in your browser, Claude Code on your desktop. They share the same brain — same model, same training — but they do different jobs in the workflow.\n\n**Chat is your project manager.** It plans, it discusses, it writes the prompts. It doesn't touch your code. Its job is to think.\n\n**Code is your builder.** It executes the prompts Chat wrote. It edits files, runs commands, pushes commits. Its job is to type.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Why splitting them works\n\nIn one shot, the same Claude can plan and build. You've probably done that in Claude Code already — typed a vague request and watched it figure things out. It works for tiny tasks.\n\nFor anything bigger, it stops working. Chat's planning brain and Code's execution brain are doing different jobs that benefit from different conditions. **Planning wants room to wander.** Execution wants tight scope. Trying to do both in one session is what causes the tangling you read about in Lesson 1.\n\nThe split is what fixes it. **Plan in Chat with no pressure to ship. Execute in Code with no pressure to think.**",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## How a session looks\n\nA typical loop, end to end:\n\n1. **Open Claude Chat.** Describe what you want to add or fix. Have a conversation. Let Chat ask clarifying questions. End with a *prompt* — three or four sentences telling Code exactly what to do.\n2. **Open Claude Code.** Paste the prompt. Watch Code execute. **When Code finishes, copy whatever it reports back** — the diff, the test output, any errors, the final summary.\n3. **Bring Code's output back to Chat.** Paste what Code told you. Ask *\"did this work?\"* or *\"what's next?\"* Chat reviews what happened, catches any mistakes Code made, and writes the next prompt.\n4. **Repeat.**\n\nThat's it. Chat → prompt → Code → output → back to Chat → next prompt. **You'll do this ten times today, a thousand times this year.** The carrying back and forth is the discipline. Get the loop in your bones now.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What you don't do\n\nYou don't paste raw thoughts into Code. You don't \"just try things\" in Code. You don't let Code make architectural decisions.\n\nIf you find yourself in Code asking *\"how should I do X?\"* — stop. **That's a Chat question.** Close the Code session, take the question to Chat, work it out there, come back to Code with a precise prompt.\n\nThe discipline is staying on this loop even when it's tempting to skip ahead.",
        },
      },
    ],
  },
  {
    moduleNumber: 3,
    lessonNumber: 3,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## What AI actually is\n\nMost people think AI is a vending machine — put in a question, get out an answer. **That mental model is wrong, and it's the biggest reason people get frustrated.**\n\nAI is a *learning system.* It adapts to what you show it. The Claude you're talking to today is shaped by every prompt you've sent it, every correction you've made, every preference you've stated. The version of Claude you have in six months will be different from the version someone else has — even though it's the same underlying model — because you'll have trained yours differently.\n\nThis works in both directions. If you feed it sloppy prompts, vague descriptions, and incorrect framing, **it learns that's how you communicate** — and responds in kind. If you train it on what you actually want, how you actually work, what you actually know and don't know, it gets sharper over time.\n\nThe whole methodology in this course assumes you understand this. Without it, the workflow breaks.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Calibrate it deliberately\n\nDon't leave the calibration to chance. Tell your Claude:\n\n- **What your skill level is.** \"I'm not a professional developer. Explain technical terms when you use them. Don't assume I know the difference between concepts unless I've shown I do.\"\n- **How you want to be talked to.** \"Don't pad responses with disclaimers. Don't ask follow-up questions when context already exists. Be direct.\"\n- **What your patterns are.** \"I push hard and don't always know when to stop. Flag when I'm working past what's sustainable.\"\n- **What success looks like.** \"I'd rather ship something imperfect than over-engineer something perfect.\"\n\nThese aren't suggestions or wishes. They're *instructions*, and Claude will hold them. **The Claude you train this way is a fundamentally different tool than the Claude you ask vague questions of.**",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## The relationship compounds\n\nThe first conversation you have with Claude about a project is the worst it'll ever be. By the tenth conversation, Claude knows your project, your style, what you care about, what you're trying to build, what you've already tried. **The signal-to-noise ratio in your prompts goes up because Claude needs less context every time.**\n\nThis is why the Chat/Code split works. Chat is the relationship layer — you build context with it over time, and that context makes every Code session sharper. **The investment in calibrating Claude pays back every single time you use it after.**\n\nBad prompts beget bad responses. Good calibration begets a tool that gets better with use. *That's not magic, that's the system working as designed.* You are training your AI. Train it well.",
        },
      },
    ],
  },
  {
    moduleNumber: 3,
    lessonNumber: 4,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## The handoff\n\nClaude Chat and Claude Code don't talk to each other. They can't see each other's conversations. **The connection between them is you** — copying a prompt from one window, pasting it into the other, then carrying the result back.\n\nThis sounds inefficient. It's the opposite. **It's the safety mechanism.** Bad prompts get caught at the bridge. Bad output gets caught coming back. Every time you carry something across, you read it. Reading is the review.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What you're actually doing\n\nWhen a Chat session ends with a polished prompt, you read it before you paste it into Code. *Does this say what I want? Is the scope tight? Does it mention which file? Does it say what not to touch?* **Five seconds of reading saves an hour of debugging.**\n\nWhen Code finishes a change, you read the diff before approving it. *Did it only touch the file I asked about? Are there unexpected changes? Does the actual code look like what I asked for?* Reading is the entire discipline.\n\nThe model is doing the work. You're the editor.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Build the habit early\n\nThe first ten times you carry a prompt across, you'll feel like you're slowing yourself down. **You're not.** You're building the habit that keeps you out of the mess Lesson 1 described.\n\nAfter twenty times, the carry becomes automatic. You stop thinking about it. The reading-on-the-way happens in your head without effort, and your sessions ship cleanly without you noticing why.",
        },
      },
    ],
  },
  {
    moduleNumber: 3,
    lessonNumber: 5,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## Capture is the skill\n\nThis is the most important sentence in the whole course: **capture is the skill, not understanding.**\n\nWhen Claude Code shows you an error, you don't need to know what it means. You need to *capture* it — screenshot it, copy-paste it, save the log — and bring it to Chat. Chat reads it and tells you what to do.\n\nWhen Cloudflare's deploy fails, same thing. When Render's database won't connect, same thing. **You don't have to understand any of it.** You have to capture what's there.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What 'capture' includes\n\n- **Error messages** — screenshot the full window, even the parts you don't think matter.\n- **Build logs** — when a deploy fails, the logs are scrollable; screenshot the section that shows red text or the word *error*.\n- **Console output** — in your browser, right-click → Inspect → Console tab. Screenshot whatever's there.\n- **The page itself** — if something *looks* wrong, screenshot the page. Claude can see it.\n- **Configuration screens** — dashboards, settings pages, the thing you're confused about. Screenshot it.\n\nThe format doesn't matter. PNG is fine. Screenshots get pasted directly into Chat by dragging or hitting paste. **Claude can read them.**",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## The screenshot habit at scale\n\nEvery dashboard you'll touch in the rest of this course — GitHub, Render, Cloudflare — has settings pages you don't fully understand. The fastest path is always the same: **screenshot, paste into Chat, ask.** Don't read the docs. Don't Google the option names. Show Chat what you're looking at and ask *\"is this set up right?\"*\n\nThe time you save with this habit, over the course of building one real project, is measured in days. It's that big.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Practice now\n\nFlip to any tab in your browser. Take a screenshot of it. Drag the screenshot into Claude Chat. Type: *\"what is this page for?\"* Send.\n\nWhatever Chat says, you've just done the most-used move in the rest of the workflow. **Build the muscle now and it's there when you need it later.**",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## The rule that ends every stuck moment\n\nMemorize this and the rest of the work is downhill from here:\n\n> **You do not have to understand errors. You do not have to guess. You just have to capture.**\n\nScreenshot. Paste into Chat. Ask. Every time. **I have not hit an obstacle in this entire workflow that this loop did not solve.** Neither will you.",
        },
      },
    ],
  },
  {
    moduleNumber: 3,
    lessonNumber: 6,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## What CLAUDE.md is\n\nA single markdown file. Named exactly `CLAUDE.md` — capital letters, no spaces, dot-md extension. Sitting at the top level of your repository, right next to `package.json`.\n\nEvery time Claude Code opens your project, it reads this file first — before anything else. **It's how Code remembers your project across sessions.**\n\nWithout it, every new session starts from zero. You spend the first ten minutes re-explaining what the project is, what's built, what the rules are. With it, those ten minutes never happen.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What goes in it\n\nA good CLAUDE.md has six sections:\n\n- **What this is** — one paragraph. The project's name, who it's for, the core idea.\n- **Current Status** — a table of what's live, what's in progress, what's not built.\n- **Architecture** — the stack. *Frontend in X, backend in Y, deployed on Z.*\n- **Repo Layout** — the file tree with one-line annotations per major folder.\n- **What's built / not built** — explicit, so Code doesn't suggest rebuilding things that already exist.\n- **Conventions** — branch names, commit format, deploy behavior, any hard rules.\n\nThe length isn't the point. **Specificity is.** A 200-line CLAUDE.md full of facts beats a 600-line one full of waffle.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What CLAUDE.md actually does — a session compared\n\nThe fastest way to see why CLAUDE.md matters is to watch the same task start two different ways.\n\n**Without a CLAUDE.md.** You open Claude Code in a project that doesn't have one, sit down to work, and the first exchange looks something like this:\n\n> **You:** I need to add a new endpoint to the API for marking a task complete.\n> **Code:** Sure — can you tell me a bit about the project first? What framework is the API using, and where does the API code live in the repo?\n> **You:** It's Express. The API is in `apps/api/src`.\n> **Code:** Got it. Is the API deployed somewhere, or is this local-only? And what's the data layer — a database, files, in-memory?\n> **You:** Render. Postgres on Supabase. The connection's in `DATABASE_URL`.\n> **Code:** Are there existing endpoints I can model the new one after?\n> **You:** Yeah — look at `routes/tasks.ts`, the GET endpoint there.\n> **Code:** Looking now…\n\nYou're ten minutes in and Code still hasn't written a line. Every one of those questions is a question Code *had* to ask, because nothing in the project told it the answers. Tomorrow morning you'll open a new session, and Code will ask all of them again.\n\n**With a CLAUDE.md.** Same project, same task, but now there's a CLAUDE.md sitting in the repo root with the six things from the section above — what the project is, current status, architecture, repo layout, what's built, conventions. You open Code:\n\n> **You:** I need to add a new endpoint to the API for marking a task complete.\n> **Code:** I've read your CLAUDE.md. Adding the endpoint to `apps/api/src/routes/tasks.ts`, modelled on the existing `GET /tasks/:id`, returning 204 on success per your convention. I'll have it ready to review in a moment.\n\nThat's the difference. The ten minutes of orientation didn't get faster — it didn't happen. Code already knew the answers before you sat down.\n\nThis is what every CLAUDE.md you'll write is buying you: a session that starts where it should start, every time, instead of restarting from zero.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Have Chat write the first draft\n\nGo to Claude Chat. Type:\n\n> *\"I have a project at <github URL>. I want you to help me write the first version of CLAUDE.md — a project memory file that lives at the root of the repo and that Claude Code reads at the start of every session. Ask me whatever questions you need to understand the project, then propose a CLAUDE.md.\"*\n\nChat will ask 5-10 questions. Answer them casually. **End the conversation with a CLAUDE.md you can copy.**\n\nThen open Claude Code. Tell it: *\"Create a file called CLAUDE.md at the project root with the following contents:\"* and paste what Chat gave you. Code creates the file. Commit it. Push it. **You now have project memory.**",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Keep it current\n\nThe value of CLAUDE.md decays if it lies. If the file says one thing and the code says another, future Code sessions get contradictory advice.\n\nThe habit: after every feature you ship, end the Chat session with *\"propose the CLAUDE.md update for what we just did.\"* Push the update to main directly — no PR, no review, it's a documentation update. **Drift is the enemy of CLAUDE.md.** Keep it honest, keep it short, keep it updated.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: '---\n\n## Module 3 — Your deliverable\n\nWhen you can check this off, Module 3 is done.',
        },
      },
      {
        type: 'checklist',
        payload: {
          items: [
            { id: 'module-3-deliverable', label: 'CLAUDE.md exists in my repo and describes what the project is, what is built, what is next, and the rules.' },
          ],
        },
      },
    ],
  },
  {
    moduleNumber: 4,
    lessonNumber: 1,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## Before you start\n\nModule 4 is a new dashboard — Cloudflare — and a new pattern: connecting GitHub to a hosting service so your code auto-deploys whenever you push.\n\nThis module is shorter and less painful than Module 2. The dashboards are similar in shape now, and the capture-and-ask loop should feel natural by this point. But the first time you watch your code build and deploy automatically — that's a moment. The first failed deploy is also a moment. Both happen in this module.\n\nTwo reminders carrying forward from Module 2:\n\n- **Use the capture-and-ask loop the moment something doesn't match the lesson.** Cloudflare redesigns its dashboard regularly. The screenshots in this course are accurate the day they were taken — they might not be accurate the day you read them. If a button isn't where the lesson says it should be, screenshot what you ARE seeing, ask Chat, follow the answer.\n- **Failed deploys are normal.** Lesson 5 of this module is entirely about failed deploys and how to recover. Don't take a red banner personally. The fix is almost always one small thing the logs will tell Chat about.\n\n---",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## GitHub stores. Cloudflare runs.\n\nGitHub is a filing cabinet. It holds your code. It doesn't execute it. Nobody can visit your repository URL and *use* the app you built — they'd see code, not a working website.\n\n**Deploying** is the step that puts your code on a server somewhere, so anyone with the URL can use it like a normal website. Module 4 is about doing that, for free, with a service called Cloudflare Pages.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Why Cloudflare Pages\n\nFor the kind of prototype you built in Module 1 — a frontend, no backend yet — Cloudflare Pages is the right choice. It connects directly to GitHub, deploys automatically when you push, and the free tier covers everything you need: **unlimited bandwidth, 500 builds a month, custom domains, HTTPS by default.**\n\nYou will never pay Cloudflare for the work in this course. Some teams pay them later for advanced features, but the free tier is what your project lives on.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What's about to happen\n\nFive minutes from now, you'll have a URL ending in `.pages.dev` that loads your prototype. You can paste it into a text to your spouse, your partner, your sister, your boss. **They click it and they see your idea running.**\n\nThe rest of this module is the mechanical setup: make a Cloudflare account, connect it to your GitHub repo, watch the first deploy succeed. Lesson 2 starts the connect.",
        },
      },
    ],
  },
  {
    moduleNumber: 4,
    lessonNumber: 2,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "Two jobs in this lesson:\n\n1. Create a Cloudflare account from scratch\n2. Tell Cloudflare to watch your GitHub repo and deploy it\n\nThe first half is account setup. The second half is the connection. Both halves are dashboards you've never seen before — use the capture-and-ask loop early and often.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Sign up for Cloudflare\n\n**Step 1.** Open a new browser tab and go to **cloudflare.com**.\n\nThe page that loads is Cloudflare's marketing home page. There's a lot on it. You don't need to read any of it.\n\n**Step 2.** Find the **Start building for free** button. It's the orange-colored button in the center of the hero section near the top of the page, sitting just below the headline. Click it.\n\n*If you don't see that exact button, the page may have been redesigned since this lesson was written. Look for any button or link with the words \"Sign up,\" \"Get started,\" or \"Start free.\" If you can't find one — screenshot what you see and ask Claude Chat where to click.*\n\n**Step 3.** A new page loads at `dash.cloudflare.com/sign-up`. It has two fields: **Email** and **Password.**\n\nUse an email you check regularly. You'll get a verification email here in a moment.\n\nPick a strong password. Cloudflare will let you know if it's not strong enough.\n\nClick **Sign Up.**\n\n**Step 4.** Cloudflare sends a verification email. Open your email in another tab. Find the message from Cloudflare. Click the verification link.\n\n*If you don't see the email within a minute, check spam. If it still doesn't show up after 5 minutes — screenshot what you see and ask Chat.*\n\n**Step 5.** After verifying, Cloudflare drops you on its onboarding page. The exact screen you see varies depending on what Cloudflare is promoting that week — sometimes it pushes you to add a domain, sometimes it lands on the main dashboard.\n\n**You don't have a domain. You don't need one. If Cloudflare insists you add one, look for \"Skip\" or \"Continue without a domain\" — usually a small link near the bottom of the page. If you can't find a way past that screen, screenshot it and ask Chat.**\n\nWhen you successfully land on a screen that has a **left sidebar with navigation items**, you're at the Cloudflare dashboard. That's where the rest of this lesson happens.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "> **Don't guess. Capture.**\n>\n> Anytime you're not sure during account creation — a button isn't where the lesson said, you get an error, the page looks different from what's described — *you do not need to figure it out alone.* Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type *\"I'm signing up for Cloudflare — is this right?\"* Chat will tell you exactly what to do.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Find Workers & Pages and create your first application\n\n**Step 6.** Look at the left sidebar of the Cloudflare dashboard.\n\nCloudflare reorganizes this sidebar regularly. Right now, the relevant item is called **Workers & Pages.** It's usually positioned about halfway down the sidebar, sometimes grouped under a \"Compute\" heading.\n\n*If you can't find Workers & Pages — it might be hidden behind a \"More\" menu, or Cloudflare may have renamed it. Screenshot the sidebar and ask Chat \"where is Workers & Pages?\" Chat will tell you the current name and location.*\n\n*The Quick-Navigate reference at `curriculum/reference/QUICK-NAVIGATE.md` lists Cloudflare's main URLs and dashboard buttons if the layout doesn't match what you're seeing.*\n\nClick **Workers & Pages.**\n\n**Step 7.** The page that loads is your Workers & Pages overview. Since you've never created anything yet, the page is mostly empty.\n\nFind the **Create application** button. It's usually in the top-right of the page.\n\nClick **Create application.**\n\n**Step 8.** A screen titled **Ship something new** appears. It offers a few ways to start your project: *Continue with GitHub*, *Connect GitLab*, *Start with Hello World!*, *Select a template.*\n\nYou want **Continue with GitHub** — because your prototype already lives there from Module 2.\n\nClick **Continue with GitHub.**",
        },
      },
      {
        type: 'screenshot',
        payload: {
          slotId: 'cf-pages-connect',
          src: '/images/lessons/cf-pages-connect.png',
          caption: 'Cloudflare → Workers & Pages → "Create application" → the "Ship something new" screen. The single most missed step in this whole module.',
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Authorize Cloudflare on GitHub\n\n**Step 9.** A GitHub authorization window pops up. This is GitHub asking your permission to let Cloudflare see your repositories.\n\nGitHub gives you a choice: authorize *all repositories* or *only select repositories.* Either works for this course.\n\n- **All repositories** — Cloudflare can see every repo you have on GitHub\n- **Only select repositories** — slightly safer, you pick which repos Cloudflare can see\n\nIf you pick \"Only select,\" click the dropdown and make sure your project's repo from Module 2 is selected. The dropdown shows all your repos — find the one you created in Module 2 and check it.\n\nScroll to the bottom of the GitHub page. Click **Authorize Cloudflare.**\n\n*If the Authorize button is grayed out, GitHub is waiting for you to confirm your password or pass a security check. Follow whatever GitHub asks. If you're stuck — screenshot what you see and ask Chat.*\n\n**Step 10.** The popup closes. You're back on Cloudflare.\n\nA screen called **Get started** appears with two options: **Import an existing Git repository** and **Drag and drop your files.**\n\nClick **Get started** next to *Import an existing Git repository.*\n\n**Step 11.** The **Select a repository** page appears. It lists your GitHub repos.\n\nFind the repo you made in Module 2. Click on it.\n\n*If your repo doesn't show up in the list:* You missed the authorization step. Go back to GitHub: github.com → click your profile in the top-right → Settings → Applications → Cloudflare → toggle your repo on. Then come back to Cloudflare and reload this page.\n\nClick **Begin setup.**",
        },
      },
      {
        type: 'screenshot',
        payload: {
          slotId: 'cf-repo-picker',
          src: '/images/lessons/cf-repo-picker.png',
          caption: "After authorizing Cloudflare on GitHub — the dropdown listing your repos. If your repo doesn't show up, you missed authorizing it — go back to GitHub settings → Applications → Cloudflare and toggle the repo on.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Configure your project\n\n**Step 12.** A configuration page loads with several fields:\n\n- **Project name** — auto-filled to your repo's name. Keep it.\n- **Production branch** — should say `main`. Keep it.\n- **Framework preset** — Cloudflare tries to detect what kind of project this is. If it picked the right thing, great. If it's blank, leave it blank.\n- **Build settings** — varies by project type. Cloudflare usually auto-fills these. If you don't know what to put, leave them as Cloudflare suggests.\n\n**For now: trust the defaults.** If something breaks because of build settings, Lesson 3 will tell you how to fix it.\n\nClick **Save and Deploy.**\n\n**Step 13.** Cloudflare starts building your project. The next page shows a progress indicator with steps like *Initializing, Cloning, Building, Deploying.*\n\nDon't refresh. Don't close the tab. This takes 1-2 minutes.\n\nWhat happens next is Lesson 3.",
        },
      },
    ],
  },
  {
    moduleNumber: 4,
    lessonNumber: 3,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## Watch the first deploy\n\nAfter you clicked **Save and Deploy**, Cloudflare shows you a page with a progress indicator — *Initializing... Cloning... Building... Deploying...* It takes 1-2 minutes. **Don't refresh the page; don't close the tab.**\n\nIf it succeeds, you'll see a green banner and your URL: something like `your-project.pages.dev`. Click it. Your prototype loads.\n\n**That's your idea, live on the internet.** Anyone with that URL can see it now.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "> **Don't guess. Capture.**\n>\n> Anytime you're not sure — a deploy failed, a button isn't where the lesson said it would be, an error popped up you don't recognize, **or you're just looking at a page and not sure what to click** — *you do not need to understand any of it.* You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.\n>\n> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what is this error?\"* or *\"what should I click here?\"* — Chat will tell you exactly what to fix, exactly what to click, or exactly what prompt to send Claude Code.\n>\n> Use this loop *anytime you're unsure, not just when something is broken.* I have not hit a single obstacle this loop didn't solve. **Use it every time.**",
        },
      },
      {
        type: 'screenshot',
        payload: {
          slotId: 'cf-deploy-success',
          src: '/images/lessons/cf-deploy-success.png',
          caption: 'The Deployments tab on Cloudflare with a green "Success" status and your .pages.dev URL. What "the deploy worked" actually looks like.',
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## When it doesn't succeed first try\n\nMaybe it failed. Common reasons: wrong build command, missing dependency, broken file path. If you see a red banner, click into the deploy and look at the build logs. **Screenshot whatever the red text says.** Paste it into Claude Chat. Type *\"my Cloudflare deploy failed, here's the log.\"* Chat will tell you the fix.\n\nCommon fixes:\n- *Build command should be empty* — for a static HTML prototype, no build command is needed.\n- *Build output directory* — usually `.` (a single dot) or `dist` depending on the project.\n- *Missing Node version* — set the `NODE_VERSION` environment variable to `20` in Cloudflare → Settings.\n\nTry the fix. Re-deploy. **Three to five attempts is normal for the first deploy.** After that, it just works.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What this URL is\n\nThe `.pages.dev` URL is permanent and free. It's not pretty — *project-name.pages.dev* — but it works. People can use it. You can share it. **It's a real website.**\n\nLater, when the project is ready for a real audience, you can connect a custom domain (`yourproduct.com`) in two clicks from the Cloudflare dashboard. That's not Module 4's job. Module 4 is about getting *something* live. **You did.**",
        },
      },
    ],
  },
  {
    moduleNumber: 4,
    lessonNumber: 4,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## Auto-deploy\n\nFrom this moment forward, every time you push code to your GitHub repo's `main` branch, Cloudflare automatically rebuilds your site and replaces what's at your `.pages.dev` URL. **You will never manually deploy again.**\n\nThe loop becomes: write a change in Claude Code → push to GitHub → Cloudflare deploys it → 60-90 seconds later, the live URL has your change. You watch it happen in the browser.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What 'push to main' means in practice\n\nIn Claude Code, after you make changes, you tell it:\n\n> *\"Commit these changes and push to main.\"*\n\nClaude Code runs the git commands. The push goes to GitHub. GitHub notifies Cloudflare. Cloudflare rebuilds. **The chain runs without you touching it.**\n\nYou can watch it: open the Cloudflare Pages dashboard → Deployments tab. Refresh after a push. You'll see a new deploy appear, progress through *Building → Deploying → Success* in real time.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Why this matters\n\nThis is the moment the work becomes *shippable.* Every fix is a deploy. Every feature is a deploy. **There's no \"now I have to release\" step** — release is automatic.\n\nWhich means scope per session matters even more. Anything you ship to `main` goes to your live URL within a minute. Reviewing diffs before pushing — the habit from Module 3 — is no longer just a discipline. **It's a brake on what your users see.**\n\nLesson 5 is what to do when a deploy goes wrong.",
        },
      },
    ],
  },
  {
    moduleNumber: 4,
    lessonNumber: 5,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## Failed deploys are normal\n\nThree out of every twenty deploys will fail. Sometimes it's a typo. Sometimes a dependency moved. Sometimes Cloudflare's build environment had a hiccup. **None of this is a crisis.** It just is.\n\nThe failure pattern is always the same: you push, you watch the Cloudflare Deployments tab, the new deploy turns red instead of green, and your live URL — the one users see — still shows the *previous successful version*. That's the only piece of good news that matters. **A failed deploy doesn't break your live site.** It just doesn't update it.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "> **Don't guess. Capture.**\n>\n> Anytime you're not sure — a deploy failed, a button isn't where the lesson said it would be, an error popped up you don't recognize, **or you're just looking at a page and not sure what to click** — *you do not need to understand any of it.* You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.\n>\n> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what is this error?\"* or *\"what should I click here?\"* — Chat will tell you exactly what to fix, exactly what to click, or exactly what prompt to send Claude Code.\n>\n> Use this loop *anytime you're unsure, not just when something is broken.* I have not hit a single obstacle this loop didn't solve. **Use it every time.**",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## The fix loop\n\nWhen a deploy fails, the loop is mechanical:\n\n1. Click into the failed deploy in Cloudflare. Find the build log.\n2. Scroll to the bottom. The error is usually in the last 30 lines, often in red.\n3. **Screenshot the bottom of the log.**\n4. Open Claude Chat. Drag the screenshot in. Type *\"my Cloudflare deploy just failed. Here's the bottom of the log.\"*\n5. Chat reads the screenshot and tells you what to fix.\n6. Open Claude Code. Tell it the fix. Push.\n7. Watch the next deploy.\n\n**That's the entire loop, every time.** You don't need to read the log yourself. You just have to capture it and ask.",
        },
      },
      {
        type: 'screenshot',
        payload: {
          slotId: 'cf-failed-deploy',
          placeholder: 'Drop a screenshot of a typical failed Cloudflare build log',
          caption: 'A failed deploy with build logs visible. This is what learners screenshot and paste into Chat for the fix.',
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What you don't do\n\nDon't panic. Don't Google the error. Don't open a Stack Overflow tab. Don't switch tools. **The capture-and-ask loop is faster than any of those.**\n\nDon't \"just try a few things\" in Claude Code without going through Chat. That's a Module 3 anti-pattern. Even when the fix is obvious, the discipline of capture → Chat → precise prompt → Code keeps your sessions clean.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## When the third attempt fails\n\nIf the same kind of failure happens three times in a row, the prompt to Chat changes:\n\n> *\"I've tried to deploy three times and each time it fails with a different error. Here's the log from the latest attempt. I think I'm missing something fundamental.\"*\n\nChat will switch gears — instead of patching the latest error, it'll back up and look at the whole setup. **Sometimes the issue is two layers above where you're looking.** The conversation pulls back, and the next deploy succeeds.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: '---\n\n## Module 4 — Your deliverable\n\nWhen you can check this off, Module 4 is done.',
        },
      },
      {
        type: 'checklist',
        payload: {
          items: [
            { id: 'module-4-deliverable', label: 'My prototype is deployed to a live URL that I can open in any browser and share with anyone.' },
          ],
        },
      },
    ],
  },
  {
    moduleNumber: 5,
    lessonNumber: 1,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## Before you start\n\nModule 5 is the most technical module in the course. You're adding two new pieces — a backend service and a database — and connecting them to the frontend you already have. That's three things talking to each other across the internet.\n\nIf you've made it through Module 2 and Module 4, you have everything you need to make it through this one. The pattern is the same: new dashboard, find the right place to click, hit a wall, capture what you see, ask Chat, fix, move on.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "A few specific things to expect here:\n\n- **You'll deploy a backend on Render and watch it fail.** Probably three or four times. That's not a sign anything is wrong — backend deploys have more moving parts than frontend deploys, and the first attempts almost never succeed. The loop catches them all.\n- **You'll handle a `DATABASE_URL` — a string that's a secret.** Anyone who has it can read or write your database. There's a specific exception to the screenshot habit in this module: when capturing screens that show database URLs or environment variables, hide or cover the actual secret value before screenshotting. Capture the layout, the error, the page — not the secret string. Chat doesn't need the secret to help; it just needs to see what's around it.\n- **You don't need to know how databases work.** You need to know how to click \"Create Database\" and how to copy a connection string from one tab into another tab. That's it. Everything else is Chat's job.\n\nThe capture-and-ask loop is doing the heavy lifting here. Trust it. Use it more than you think you need to. This module is where the loop saves the most time.\n\n---",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## The signal you need a backend\n\nUp through Module 4, your app has been *frontend only* — HTML, CSS, JavaScript, running in someone's browser. That works for a lot of ideas. A calculator, a chart viewer, a tool that takes input and shows output — none of those need a backend.\n\n**The moment your app needs to remember anything between visits, you need a backend.** Users coming back to find their data still there. Anything that survives a browser refresh. Anything that gets saved.\n\nIf your idea has none of that, you can skip Module 5. Plenty of useful prototypes ship without backends.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What a backend actually is\n\nA second piece of software, running on a different computer than the user's browser, that *holds the state* — the database, the user accounts, the saved files. The frontend in the browser calls the backend over the internet whenever it needs to read or write something.\n\nThink of it like a restaurant: **the frontend is the dining room**, what the customer sees. **The backend is the kitchen** — they never go in there, but everything they eat comes from it. The database is the pantry inside the kitchen.\n\nIn this course, the kitchen is a service called Render, and the pantry is a Postgres database hosted on Supabase. Both are free at the scale we're using.\n\nPostgres (sometimes \"PostgreSQL\") is a database — it holds rows of data like users, posts, or anything else your app saves. It's the industry-standard free database. **You don't need to know SQL or how databases work internally.** You need to know how to spin one up and how to connect your backend to it. That's Lessons 2 and 3.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## The shape of what's coming\n\nBy the end of this module, you'll have:\n\n- A Render account, free tier, with a backend service deployed\n- A Postgres database on Supabase, connected to that backend\n- An environment variable (`DATABASE_URL`) holding the connection string\n- Your Cloudflare frontend pointed at the new backend\n- An app that remembers things\n\nThis is the most technical module in the course. **It's also the one where the capture-and-ask habit pays back the most.** Expect three to five failed deploys. That's the rhythm here. Don't take it personally.",
        },
      },
    ],
  },
  {
    moduleNumber: 5,
    lessonNumber: 2,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "You have two jobs in this lesson:\n\n1. Add a minimal backend to your repo (your project so far has been all frontend; Render needs something to actually run).\n2. Sign up for Render and deploy that backend so it's live on the internet at a URL you can hit from a browser.\n\nThe first job takes five minutes and Claude Code does the work. The second job is where most learners stall — the Render dashboard has more configurable fields than any other service in this course, and most of those fields can break the deploy in confusing ways. We're going to walk it slowly. By the end you'll have a web service name and a `.onrender.com` URL — write both down, because Lessons 3 and 5 ask you for them.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "> **Don't guess. Capture.**\n>\n> Anytime you're not sure — a button isn't where this lesson said it would be, an unexpected page appears, an error you don't recognize pops up, or you're just looking at a screen and not sure what to click — *you do not need to understand any of it.*\n>\n> Screenshot what's on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what should I click here?\"* or *\"what is this error?\"* Chat will tell you exactly what to do next. Use this loop anytime you're unsure, not only when something is broken.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 1 — Add a backend to your repo\n\nBefore Render can deploy anything, your repo needs backend code that *can* be deployed. The repo from Module 2 holds your prototype's frontend — but unless you've added a backend already, Render has nothing to run.\n\nOpen Claude Code and type:\n\n> *\"Add a minimal Node.js Express backend to this repo. Create a server.js file that runs an Express app on the port from `process.env.PORT`. Add one endpoint at `/api/health` that returns `{ ok: true }`. Update package.json with the right dependencies (express) and a `start` script that runs `node server.js`. Commit and push to main.\"*\n\nWatch Code work. It'll add a `server.js` file, update `package.json`, run `npm install`, commit, and push. When it's done, your repo has both frontend AND a tiny backend.\n\nThe `process.env.PORT` part of that prompt matters more than it looks. Render assigns your service a port at runtime through an environment variable called `PORT`. If your code listens on a hardcoded port — `3000`, `8080`, anything else — Render's build will succeed but the service will fail to start. The Code prompt above forces the right pattern from the beginning so you don't hit this.\n\n*If Code reports any errors during the push (auth failures, push rejected, anything red), screenshot the terminal and ask Claude Chat. Don't move on until the push has succeeded — Render needs the code to be on GitHub.*\n\nOnce Code reports the push succeeded, come back here.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 2 — Decide which Render account you're using\n\nBefore you open render.com, decide which of these you are:\n\n- **No Render account yet** → Step 3 (sign up from scratch).\n- **You already have a Render account** → go to render.com, click **Log in**, and skip to Step 5.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 3 — Sign up at render.com\n\nOpen **render.com** in a browser tab. Click **Get Started** (or **Start for free** — the wording moves around) in the top-right or in the hero.\n\nYou'll be offered several signup methods: GitHub, GitLab, Google, or email. **Use GitHub.** You're going to connect Render to your GitHub repo in a moment anyway; signing up with GitHub does both at once and is the path the rest of this lesson assumes.\n\nBefore you click *Sign up with GitHub*, do the same avatar check you did in Module 2 Lesson 5: open a new tab, go to github.com, look at the top-right corner. **The username showing there is the GitHub account Render is about to connect to.** If it's not the same username you wrote down in Module 2 Lesson 2, sign out of GitHub and sign back in with the right account first.\n\n*If Render asks for a credit card during signup — for the free tier — that's normal in some regions and account types. The free tier itself doesn't cost anything; the card is for verification and for if you ever decide to upgrade. If you don't want to enter a card, your other option is signing up with email instead and connecting GitHub later, which adds steps but works.*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 4 — Authorize GitHub for Render\n\nGitHub shows you an *Authorize Render* page. This is the same authorization flow you saw in Module 2 Lesson 5 — Render is asking for permission to read your repos so it can deploy from them.\n\nNear the bottom, GitHub asks which repositories Render can see:\n\n- **All repositories** — easier. Render can see everything on your account.\n- **Only select repositories** — tighter. If you pick this, **tick the repo you made in Module 2** from the list, or Render won't see it in the next step.\n\nScroll to the bottom and click the green **Authorize Render** button.\n\n*If the Authorize button is grayed out, GitHub is waiting on a password or 2FA step above. Scroll up and complete it. If you picked \"Only select repositories\" and forgot to tick your repo, you can fix it later: github.com → click your avatar → **Settings** → **Applications** → find **Render** → **Configure** → toggle the repo on.*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 5 — Create a Web Service\n\nYou should now be in the Render dashboard. If Render dropped you on a \"Welcome\" or workspace-setup screen, click through it with defaults until you reach the main dashboard.\n\nIn the top-right, click **+ New**. A dropdown appears showing the things Render can host — Web Service, Static Site, Background Worker, Cron, and others.\n\n**Pick Web Service.** Not Static Site. Your project also has a frontend, so Static Site can look like the right answer at first — it isn't, because what you just added in Step 1 is a backend that needs to *run*, not static files to be served.\n\n*If the **+ New** button isn't where this lesson says, Render may have redesigned the dashboard since this was written. Screenshot what you see and ask Claude Chat \"where do I create a new Web Service on Render?\" Render redesigns the dashboard regularly; the capture-and-ask loop is the durable fallback when the screenshots don't match.*\n\n*The Quick-Navigate reference at `curriculum/reference/QUICK-NAVIGATE.md` lists Render's main URLs and dashboard buttons if the layout doesn't match what you're seeing.*",
        },
      },
      {
        type: 'screenshot',
        payload: {
          slotId: 'render-new-service',
          src: '/images/lessons/render-new-service.png',
          caption: 'Render dashboard → "+ New" → "Web Service" → repo picker. The starting point for any backend deploy.',
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 6 — Pick your repo\n\nRender shows you the GitHub repos it can see. Find the one from Module 2 and click **Connect** next to it.\n\n*If your repo doesn't appear in the list, it's almost always because Render's GitHub authorization doesn't include it. Fix: in a new tab, go to github.com → click your avatar → **Settings** → **Applications** → find **Render** → **Configure** → tick your repo → Save. Then come back to this Render page and refresh.*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 7 — Configure the service\n\nA configuration page opens with a lot of fields. Most of them are auto-filled and correct. A few are not. Go through them in this order:\n\n1. **Name** — what shows up in your service URL. Pick something short and lowercase: *yourname-backend*, *projectname-api*, something like that. Lowercase letters, numbers, and hyphens only. **Write this name down.** Lesson 3 asks you to find this service in the dashboard by name.\n2. **Region** — pick the one closest to you. Render usually auto-detects, but it isn't always right. **Note which region you pick.** In Lesson 3 you'll set up a database on Supabase, and you want to pick the same region there to keep them close — a database on the other side of the planet adds noticeable lag to every request.\n3. **Branch** — should be `main`. If it shows something else like `master`, that's whatever your repo's default branch is called — leave it as the default.\n4. **Root Directory** — leave empty. Your backend is at the top level of the repo, not in a subfolder.\n5. **Runtime** — Render auto-detects from your code. Should say *Node*. If it shows something else (Static Site, Bun, Docker), capture and ask before continuing.\n6. **Build Command** — should be `npm install` or `npm install && npm run build`. Either is fine for what we have. If Render didn't auto-fill anything, type `npm install`.\n7. **Start Command** — **this is the one to check carefully.** It should say exactly `npm start`. If Render auto-filled something else — `node index.js`, `node server.js`, a blank field, anything else — change it to `npm start`. The wrong start command is the #1 silent failure on this page, and you won't find out it's wrong until the deploy fails three minutes from now.\n8. **Instance Type** — pick **Free**. If Free isn't the default, scroll the instance types until you see it and click it. (Render free instances have 512MB of RAM, which is plenty for what we're doing.)\n\nThere's a section further down for **Environment Variables**. Leave it empty for now. Lesson 3 is where you'll add `DATABASE_URL`; you don't need anything in there to do this first deploy.\n\nScroll to the bottom. Click **Create Web Service.**",
        },
      },
      {
        type: 'screenshot',
        payload: {
          slotId: 'render-service-config',
          src: '/images/lessons/render-service-config.png',
          caption: 'The configuration page with Name, Region, Branch, Build Command, Start Command, Instance Type all filled in. The Start Command field is the one to verify before clicking Create.',
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 8 — Watch the first deploy\n\nRender takes you to your service's page and starts building. A log scrolls — cloning the repo, installing dependencies, starting the service. **Three to five minutes is normal for a first deploy.**\n\nThree things can happen:\n\n- **The deploy succeeds.** You see a green **Live** badge near the top of the page, and a URL ending in `.onrender.com` shown next to the service name. Move to Step 9.\n- **The deploy fails during build.** The log shows a red error before \"Deploying...\" Most commonly: a missing dependency or a wrong build command. Screenshot the last twenty lines of the log and ask Claude Chat *\"my Render build failed, what's wrong?\"* Fix what Chat tells you (usually a one-line change in your repo), push the fix, Render auto-deploys again.\n- **The build succeeds but the service won't start.** The log gets to \"Build successful\" then hangs or shows *\"Application failed to listen on port...\"* This is the PORT-binding failure mentioned in Step 1 — your server isn't listening on `process.env.PORT`. If you used the Step 1 Code prompt as written, this shouldn't happen; if it does, screenshot and ask Chat.\n\nMost learners hit at least one of these. **The first deploy almost never succeeds first try** — that's what Lesson 4 is for, so don't worry if you're staring at a red log right now. Capture the log, fix what's broken, redeploy.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 9 — Verify the service is actually live\n\nA green *Live* badge means Render thinks your service started. To confirm the backend is actually running and reachable, open a new browser tab and visit:\n\n```\nhttps://yourservicename.onrender.com/api/health\n```\n\n(Replace `yourservicename` with the name you picked in Step 7.)\n\nYou should see `{\"ok\":true}` — that's the endpoint Code added in Step 1 talking to you. If you see that, your backend is live on the internet.\n\n*If the URL loads but shows a different response, or you see an \"Application failed to respond\" page, or it takes thirty seconds before responding — capture the page and ask Claude Chat. The thirty-second case is usually the free-tier cold-start, covered in the next section; the other cases mean something's still wrong with the deploy.*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### A note on Render's free tier\n\nTwo things to know about the free tier so you're not surprised later:\n\n- **Free web services spin down after about 15 minutes of inactivity.** The first request after they sleep takes around 30 seconds to wake them up. This isn't a bug, and your service isn't broken — it's the trade-off of the free tier. If you come back to your app a few days later and the first page load is slow, that's why.\n- **The free tier has a 750-hour-per-month cap across your whole account.** One service running 24/7 fits inside the cap. Two services running 24/7 will hit the cap and one will be paused until the next month. For this course you only need one Render service, so you're fine — just don't spin up a second one without knowing this.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### Step 10 — Find your way around the service page\n\nBefore you leave this lesson, look at the left sidebar of your service's page. You don't need to do anything in any of these tabs right now — the rest of Module 5 will send you to them — but knowing where they are saves time later:\n\n- **Logs** — every line your service prints, including errors. Lesson 4 sends you here when a deploy fails.\n- **Environment** — where environment variables live. Lesson 3 sends you here to add the database connection string.\n- **Settings** — where you'd change the name, region, branch, or delete the service if you ever need to.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "### What you have now\n\n- A Render account, free tier, connected to your GitHub.\n- A live backend web service with a green *Live* badge.\n- A `.onrender.com` URL that responds with `{\"ok\":true}` when you visit `/api/health`.\n- A note somewhere with your **service name** and your **`.onrender.com` URL**. You need both in Lesson 3 (where you'll add the database) and Lesson 5 (where you'll wire the frontend up to this backend).\n\nNext lesson, you'll add a Postgres database to your backend so it can remember things between requests.",
        },
      },
    ],
  },
  {
    moduleNumber: 5,
    lessonNumber: 3,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "You have two jobs in this lesson:\n\n1. Create a Supabase account and a database that won't disappear on you.\n2. Tell your app — the one already running on Render from the last lesson — where that database lives.\n\nThe first job is straightforward signup. The second is connecting them, which is the fiddly part: Supabase shows your database's connection string in a few different forms, and you need the right one. Picking the wrong one is the most common place to get stuck in this lesson. That's normal — and if you're unsure which to use, you don't guess, you capture and ask.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Section 1 — Create your account and project\n\n1. Open **[supabase.com](https://supabase.com)** in your browser.\n2. Click **Start your project**. It's the hero button in the center of the page, on the left of the two buttons there.\n3. You'll land on a screen titled \"Welcome back.\" That heading is for returning users — you're new, so click **Don't have an account? Sign up** underneath the login fields.\n4. Sign up with GitHub (you already made that account back in Module 2, so this is the quickest path) or with email.\n5. Once you're in, create a new project. Give it a name, set a database password, and pick the region closest to you. **Save that database password somewhere you can find it again** — Supabase only shows it to you here.\n6. Supabase takes a minute or two to provision the database. Wait for it to finish before the next section.\n\n*If the page looks different from these steps, the dashboard has been redesigned since this was written — that happens. Screenshot what you see, paste it into Claude Chat, and ask \"I'm trying to create a new Supabase project, where do I click?\" Capture is the durable move when the layout shifts.*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Section 2 — Get your connection string\n\n> **Don't guess. Capture — with one exception.**\n>\n> The capture-and-ask habit applies as always, with one rule specific to this section and the next: **the Supabase connection string is a secret.** It contains your database password — anyone who has it can read or write your database. Before screenshotting the Connect panel here, or the Environment variables tab on Render in Section 3, hide the value (most dashboards offer an eye icon) or cover it on your screen. Capture the page layout, the error, the buttons — never the actual string. Chat doesn't need the secret to help; it just needs to see what's around it.\n\nA connection string is the address your app uses to reach the database. Supabase shows you a few variations of it, which is the part that trips people up. You only need one, and you don't need to know how they differ.\n\n1. Find the **Connect** button at the top of your project dashboard and click it.\n2. Supabase shows several connection strings, grouped by type (a direct connection and one or two pooled ones). Copy the one that fits how your app connects — for a backend that stays running on Render, that's typically the pooled connection string.\n3. Keep it somewhere safe — it contains your database password.\n\nIf the panel offers options you're unsure about, this is the moment to capture, not guess. Screenshot the Connect panel, paste it into Claude Chat, and ask \"which of these connection strings should I use for my Node backend on Render?\" Picking the wrong one is the single most common way to get stuck here, and one screenshot settles it.\n\n*If you can't find a Connect button, look along the top of the dashboard or in project settings — wording moves around. Screenshot it and ask Claude \"where do I find my database connection string in Supabase?\"*\n\n*The Quick-Navigate reference at `curriculum/reference/QUICK-NAVIGATE.md` lists Supabase's main URLs and dashboard buttons if the layout doesn't match what you're seeing.*",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Section 3 — Point your app at the database\n\nYour app is already running on Render from the last lesson. You're going to tell it to use the Supabase database.\n\n1. Go to your [Render dashboard](https://dashboard.render.com), open the web service you deployed last lesson, and click **Environment** in the left sidebar.\n2. Click **Add Environment Variable**. Set the **Key** to `DATABASE_URL` and the **Value** to the connection string you copied from Supabase.\n3. Click **Save Changes**. Render redeploys automatically — give it three to four minutes.\n4. Once the deploy is live, have Claude wire your backend to the database the same way you've asked it to build every other piece. You bring what you have — the connection string and your current server code — and Claude writes the connection code. You don't need to write it yourself.\n\n*If the deploy fails or the app can't reach the database, the cause is almost always the connection string in the wrong variable, or the wrong string copied from Supabase. Screenshot the Render logs, paste them into Claude Chat, and ask one question: \"my app can't connect to my Supabase database, what's wrong?\"*",
        },
      },
      {
        type: 'screenshot',
        payload: {
          slotId: 'render-env-vars',
          src: '/images/lessons/render-env-vars.png',
          caption: 'The Environment tab on the backend service with DATABASE_URL pasted in. The hand-off between database and backend.',
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## A note on free tiers, honestly\n\nSupabase free projects pause after about seven days with no activity. They don't get deleted — you resume them with one click from the dashboard — but they do go to sleep. This is better than where Render's free Postgres left you (it deleted free databases after 90 days), though it isn't nothing. If your app seems down after you've been away for a week, check your Supabase dashboard first and resume the project.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "> **Don't guess. Capture.**\n>\n> Dashboards get redesigned and buttons move. If a step here doesn't match what's on your screen, don't hunt around hoping you've found the right thing. Screenshot it, paste it into Claude Chat, ask one short question. Finding the right place is Claude's job; capturing what you see is yours.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What you have now\n\n- A live Postgres database on Supabase, connected to your app on Render.\n- A database that won't be deleted out from under you in 90 days.\n- The connection string your app needs, set as an environment variable on Render.\n\nNext lesson, you'll confirm everything is talking to each other end to end and see your data persist.",
        },
      },
    ],
  },
  {
    moduleNumber: 5,
    lessonNumber: 4,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## Backend deploys are harder\n\nThe Cloudflare deploys in Module 4 succeeded most of the time. Backend deploys on Render are different — **plan for the third or fourth attempt to be the one that works.**\n\nHere's why. A frontend deploy has one job: serve some HTML files. A backend deploy has to:\n\n- Install all dependencies\n- Connect to the database (with the right URL, the right credentials, the right region)\n- Listen on the right port\n- Handle the right environment variables\n- Start without crashing\n\nAny one of those failing breaks the deploy. **You'll see all five kinds of failure at some point.**",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "> **Don't guess. Capture.**\n>\n> Anytime you're not sure — a deploy failed, a button isn't where the lesson said it would be, an error popped up you don't recognize, **or you're just looking at a page and not sure what to click** — *you do not need to understand any of it.* You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.\n>\n> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what is this error?\"* or *\"what should I click here?\"* — Chat will tell you exactly what to fix, exactly what to click, or exactly what prompt to send Claude Code.\n>\n> Use this loop *anytime you're unsure, not just when something is broken.* I have not hit a single obstacle this loop didn't solve. **Use it every time.**",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## The common ones\n\nThe four failures that happen most:\n\n1. **\"Cannot find module ...\"** — a dependency is missing from `package.json`. Tell Chat which module is missing and it'll patch the file.\n2. **\"Connection refused / could not connect to database\"** — the `DATABASE_URL` env var isn't set or has a typo. Re-check the Environment tab.\n3. **\"Application failed to listen on port ...\"** — the backend isn't reading the `PORT` env var Render provides. One-line fix in your server start file.\n4. **\"Permission denied\" / \"Out of memory\"** — Render free tier has limits. Usually a code fix, not a Render fix. Send the log to Chat.\n\n**Every one of these has a one-line fix.** The fix loop is the same as Module 4: screenshot the bottom of the Render log, paste into Chat, follow the instruction, redeploy.",
        },
      },
      {
        type: 'screenshot',
        payload: {
          slotId: 'render-build-logs',
          src: '/images/lessons/render-build-logs.png',
          caption: 'The Logs tab. When a deploy fails, this is what learners screenshot and paste into Chat.',
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Don't switch tools\n\nThe temptation when backend deploys fail repeatedly is to *try a different host* — \"maybe Vercel is easier, maybe Railway works.\"\n\nIt isn't. They have the same problems. **Switching tools mid-debug doubles your work and resets your context.** The fix you need is probably one prompt away in Chat. Stay on Render. Push through.\n\nA backend that deploys cleanly on Render will deploy cleanly anywhere later. **Do the work once and you have it forever.**",
        },
      },
    ],
  },
  {
    moduleNumber: 5,
    lessonNumber: 5,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## The last wire\n\nFrontend deployed on Cloudflare. Backend deployed on Render. Database connected to the backend. **One wire left:** tell the frontend where to find the backend.\n\nRight now, your frontend doesn't know the backend exists. It has no URL to call. Lesson 5 is the moment you connect them, and it's a single environment variable on Cloudflare.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "> **Don't guess. Capture.**\n>\n> Anytime you're not sure — a deploy failed, a button isn't where the lesson said it would be, an error popped up you don't recognize, **or you're just looking at a page and not sure what to click** — *you do not need to understand any of it.* You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.\n>\n> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what is this error?\"* or *\"what should I click here?\"* — Chat will tell you exactly what to fix, exactly what to click, or exactly what prompt to send Claude Code.\n>\n> Use this loop *anytime you're unsure, not just when something is broken.* I have not hit a single obstacle this loop didn't solve. **Use it every time.**",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Find your Render URL\n\nGo back to Render, open your Web Service, and find the URL at the top of the page — `your-service-name.onrender.com`. Copy it.\n\nIf you're not sure which URL is which: backend = ends in `.onrender.com`, frontend = ends in `.pages.dev`. You want the `.onrender.com` one here.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Add the env var to Cloudflare\n\nGo to **Cloudflare → Workers & Pages → your project → Settings → Environment variables.**\n\nClick **Add variable.** The key depends on what your frontend code is looking for — common ones are `VITE_API_URL`, `REACT_APP_API_URL`, or `NEXT_PUBLIC_API_URL`. **If you're not sure which:** open Claude Chat, paste your frontend's API-calling code, and ask *\"what environment variable does this code expect for the API URL?\"* Chat tells you.\n\nValue: paste your Render URL (the `.onrender.com` one).\n\nClick **Save.**",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## Trigger a redeploy\n\nCloudflare won't pick up the new env var until the next deploy. You can either wait for your next push or trigger one manually: **Pages → your project → Deployments tab → Retry deployment** on the most recent build.\n\n60-90 seconds later, your frontend at `.pages.dev` is talking to your backend at `.onrender.com`.\n\nGo to your `.pages.dev` URL. Trigger whatever action your app does that should save data. Refresh the page. **The data should still be there.** That's the moment the app is real.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What you've built\n\nA frontend on Cloudflare. A backend on Render. A Postgres database. All of it talking, all of it deployed, all of it free for the scale you're at.\n\nThis is the same shape as every production web app shipped this year. **There is nothing more to add until you decide what to add.** Module 6 is the discipline that keeps it all running cleanly as you do.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: '---\n\n## Module 5 — Your deliverable\n\nWhen you can check this off, Module 5 is done.',
        },
      },
      {
        type: 'checklist',
        payload: {
          items: [
            { id: 'module-5-deliverable', label: 'My backend is deployed on Render with a Postgres database, the frontend on Cloudflare talks to it, and I can save data and see it persist after a refresh.' },
          ],
        },
      },
    ],
  },
  {
    moduleNumber: 6,
    lessonNumber: 1,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: '## Three parts\n\nA precise prompt for Claude Code has three parts, always in the same order:\n\n1. **What you want — one sentence.** *"Add a logout button to the top-right of every page."*\n2. **The specifics — files, behaviors, what to leave alone.** *"In `apps/web/src/components/Nav.tsx`, add a Logout button that calls `useAuth().logout()`. Don\'t touch any other component."*\n3. **The footer.** *"Show me the diff before applying. Do not merge. Leave as a draft PR."*\n\n**The length isn\'t the point — the shape is.** A small change might fit in three sentences. A complex feature with multiple files, embedded code, and lots of context might fill the screen. Both are fine. What matters is that every prompt has the three parts in the same order, no matter how long it ends up being.',
        },
      },
      {
        type: 'markdown',
        payload: {
          md: '## Why this shape works\n\nThe first sentence anchors. Without it, Claude reads the rest hunting for what you actually want. With it, the rest fills in the detail.\n\nThe middle is the protection. Naming what to *leave alone* is the most underrated move in the whole workflow. **Code is permissive by default.** It\'ll happily refactor an adjacent file you weren\'t thinking about. The "don\'t touch X" line is what stops that.\n\nThe footer makes the diff reviewable. *Show me the diff. Don\'t merge.* These five words save more time than any other habit in this course. **You write them at the end of every prompt, forever.**',
        },
      },
      {
        type: 'markdown',
        payload: {
          md: '## Build the template\n\nKeep a saved prompt template — in a note, a sticky, a Claude Chat conversation, anywhere. Mine looks like:\n\n> *"<one-sentence ask>.*\n>\n> *In `<file path>`, <specific change>. <what not to touch>.*\n>\n> *Show me the diff before applying. Do not merge. Leave as draft."*\n\nFill it in for each task. **Same shape every time.** The repetition is the point — your eyes learn to scan for the four parts and you can tell at a glance whether a prompt is ready to send or still needs work.',
        },
      },
    ],
  },
  {
    moduleNumber: 6,
    lessonNumber: 2,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: '## What a diff is\n\nA *diff* is the list of changes Claude Code is about to apply. Files added in green. Lines added in green. Lines removed in red. Files renamed, moved, deleted — all shown.\n\nClaude Code shows you the diff when you ask for it. Some interfaces show it automatically; some require you to type *"show me the diff before applying."* That\'s why the footer in Lesson 1 always ends with that line. **The diff is the moment you catch problems.**',
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What to look for\n\nFive things, every time:\n\n1. **The files changed.** Are they only the ones you asked about? If there's an extra file, that's scope creep.\n2. **The line count.** A two-line ask should produce a two-line diff. A two-line ask producing a 40-line diff is a flag.\n3. **The new code.** Does it look like what you asked for? Skim it. You don't have to understand every word.\n4. **The deleted code.** Anything important being removed? Is the removal what you wanted?\n5. **Side effects.** Imports added or removed. Configuration touched. Build files modified. These are the usual culprits when something breaks after a merge.\n\n**Five seconds per file, every time.** That's the whole discipline.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: '## When to reject\n\nIf the diff is wrong — wrong scope, wrong approach, wrong files — reject it. Tell Claude Code *"reject — instead, just <correct ask>."* The session continues, the rejected diff is gone.\n\nIf the diff is *partially* right — the change is correct but it also touched something it shouldn\'t — you can accept it and patch separately, or reject and re-prompt with tighter scope. **Re-prompting is usually faster.** A second prompt with the lesson learned is cleaner than untangling the first.\n\nThe muscle to build: **rejecting is free.** It feels like throwing work away. It isn\'t — the work was wrong, and accepting it would cost more to unsnarl later.',
        },
      },
    ],
  },
  {
    moduleNumber: 6,
    lessonNumber: 3,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: '## Summaries lie quietly\n\nWhen Claude Code finishes a task, it often tells you what it did. *"I\'ve updated the auth flow. The login endpoint now returns 429 on rate-limit, and I added a corresponding test."*\n\n**That summary is a summary, not a receipt.** It says what Claude *meant* to do. It doesn\'t prove what actually happened. Most of the time the two match. Sometimes they don\'t — the change is partial, the test wasn\'t actually added, the file path is wrong.\n\nSummaries drift. Receipts don\'t lie.',
        },
      },
      {
        type: 'markdown',
        payload: {
          md: '## What a receipt looks like\n\nA receipt is the actual output of something that happened. The list of files changed in the git status. The output of the test that just ran. The HTTP response from the live endpoint. The screenshot of the page in a browser.\n\nWhen something matters, ask for the receipt instead of the summary:\n\n> *"Show me the actual output of `npm test` after that change."*\n>\n> *"Run a curl request against the new endpoint and show me the full response, including status and headers."*\n>\n> *"Show me `git diff HEAD~1` — I want to see exactly what got committed."*\n\n**The receipt either confirms the summary or contradicts it.** Either way, you know where you stand.',
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## When to bother\n\nNot every change needs a receipt. Most don't. The discipline is *knowing which ones do.*\n\n- Anything that touches auth, payment, or user data: receipt.\n- Anything that changes deployment: receipt.\n- Anything that's failed once before in this code: receipt.\n- Anything that you'll have a hard time rolling back: receipt.\n- Small UI changes that you'll see in the browser anyway: summary is fine.\n\nThe rule of thumb: **if a wrong summary would cost you an hour, ask for the receipt.** If it'd cost you ten seconds, save the breath.",
        },
      },
    ],
  },
  {
    moduleNumber: 6,
    lessonNumber: 4,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: '## Drift is the enemy\n\nYou wrote a CLAUDE.md in Module 3. You committed it to your repo. Every Claude Code session reads it at the start.\n\nIf the file says one thing and the code says another, future sessions get contradictory advice. Code reads *"the database is on Postgres"* and *"we use Mongo"* and has to guess. **Sometimes it guesses wrong.**\n\nThis is drift. The longer you build, the more drift accumulates. The CLAUDE.md decays in trust value. The sessions get more confused. **The whole project memory pattern breaks.**',
        },
      },
      {
        type: 'markdown',
        payload: {
          md: '## The fix is a small habit\n\nAt the end of every feature you ship, the last Chat conversation isn\'t *"what\'s next?"* It\'s:\n\n> *"Propose the CLAUDE.md update for what we just did."*\n\nChat reads what\'s currently in CLAUDE.md (you can paste it or it can read from your repo), looks at what changed in the last few commits, and proposes the patch. You glance at the patch — most of the time it\'s right — and tell Claude Code to apply it.\n\nThe whole habit is **two minutes per feature.** Worth it.',
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## When to update vs not\n\nNot every change needs a CLAUDE.md update. Don't bloat the file. The rule:\n\n- **New layer added** (database, auth, payment provider) → update.\n- **New section of the app** (a new page, a new admin panel) → update.\n- **A *decision* changed** (we used to use X, now we use Y) → update.\n- **A *fact* changed** (the project moved from Render to Vercel) → update.\n- **Bug fix that doesn't change architecture** → no update.\n- **Copy edits, color tweaks, layout fixes** → no update.\n\nThe test: **would a Claude Code session a month from now get confused without this update?** If yes, update. If no, skip.",
        },
      },
    ],
  },
  {
    moduleNumber: 6,
    lessonNumber: 5,
    blocks: [
      {
        type: 'markdown',
        payload: {
          md: "## Every builder hits the wall\n\nThere will be a point in this project — there's already been one, maybe — where nothing works. Three deploys in a row failed. The latest feature broke two previous ones. Chat keeps suggesting things you've already tried. **Nothing makes sense.**\n\nThis happens. To everyone. It's not a sign you're bad at this, and it's not a sign your project is broken. It's just the bottom of a particular dip, and the way through is the same for everybody.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What to do\n\nSlow down. Don't give up.\n\nTake a break. Get up. Walk somewhere. **Don't open another tab to Google your problem.** Don't try a fifth fix that's basically the same as the first four. The brain needs to leave the chair for a few minutes.\n\nCome back. Read the errors again — the actual text, not your memory of them. Walk through what you know. Often, the thing you missed is one line up from where you've been looking. **The breakthrough usually comes within an hour of the worst stuck moment.**\n\nIt's earned by staying in the chair five minutes longer than feels reasonable. Not by trying harder while stuck. By stopping, breathing, returning.",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: "## What you'll know that nobody told you\n\nIf you ship this project — and you can — you'll have done something that *most people who've thought about building software never do.* You'll know exactly how brittle the production stack is. You'll know exactly which parts of Claude's output to trust and which to verify. You'll know exactly how the chat-and-code split works in your hands.\n\n**That knowledge is the actual product of this course.** The deployed app is the proof. Everything you build after this one is faster because of what you learned here.\n\nThere isn't another module after this. The course ends when you ship. **Go ship.**",
        },
      },
      {
        type: 'markdown',
        payload: {
          md: '---\n\n## Module 6 — Your deliverable\n\nThe course ends when you ship. This is the deliverable that proves the methodology is yours now.',
        },
      },
      {
        type: 'checklist',
        payload: {
          items: [
            { id: 'module-6-deliverable', label: 'My first post-launch feature is shipped end-to-end using the full discipline — Chat-written prompt, scoped Code session, draft PR, diff review, smoke test, CLAUDE.md update.' },
          ],
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
