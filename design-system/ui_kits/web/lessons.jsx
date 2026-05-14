// MODULE_LESSONS — content seeded from kgundy1/LuKaiAI/curriculum/
// Module 0 + Module 1 are drafted (verbatim from module-0-lessons.md and module-1-lessons.md).
// Modules 2-6 are scaffolded from COURSE_OUTLINE.md — each lesson's outline bullet is the opening prose,
// followed by a 'stub' block where the founder drafts the rest.

window.MODULE_LESSONS = {
  "0": {
    "title": "Before you start",
    "description": "Three quick lessons to set you up: what this course is, signing up for Claude, and picking the right plan.",
    "lessons": [
      {
        "num": 1,
        "title": "What this course is",
        "time": "~5 min",
        "blocks": [
          {
            "type": "prose",
            "md": "This course teaches you how to build real software using Claude.\n\nNot \"learn to code.\" Not \"get into AI.\" Build software. The kind of software you'd otherwise pay a developer to build, or do without entirely because the path to getting it built felt too long.\n\nBy the end of Module 6, you'll have two things:\n\nA working tool that you actually use. Not a tutorial project, not a portfolio piece — your idea. The thing you'd actually open Monday morning, or use to solve something at home, or share with a friend who'd find it useful. Something you describe to Claude, iterate on until it works the way you want, and then ship.\n\nThe skill to keep building. The course is structured so that by the time you finish it, the next thing you build doesn't need a course. You'll know the moves: how to describe an idea so Claude builds the right thing, when to iterate by reacting versus planning, how to upload real source documents instead of explaining them, when a prototype is \"good enough\" to ship."
          },
          {
            "type": "prose",
            "md": "## Who this is for\n\nAnyone with the will to build something and bring it to life. The form doesn't matter — a tool for your job, an app for your family, a side project you've been thinking about for years, a one-off thing you only need once. What matters is that you have an idea you actually want to see exist, and you're tired of waiting for someone else to build it.\n\nYou don't need a coding background. You don't need a design background. You don't need to have used AI before this. Operators, managers, hobbyists, parents, business owners, creators, people halfway into a career change, people who just had an idea last week — all of you fit.\n\nWhat you do need is the will to keep going when the first version isn't right. The course works because you bring the idea and the willingness to iterate; Claude brings the building. Bring those two things and the rest is teachable."
          },
          {
            "type": "widget",
            "kind": "QuickCheck",
            "props": {
              "question": "You don't have a coding background. Does this course work for you?",
              "choices": [
                "Only if I take a coding bootcamp first.",
                "Yes — what matters is the will to keep going when the first version isn't right.",
                "Only if I have a design background or have used AI before."
              ],
              "correctIndex": 1,
              "explain": "Right. Operators, managers, parents, business owners — all fit. You bring the idea and the willingness to iterate; Claude brings the building."
            }
          },
          {
            "type": "prose",
            "md": "## What this is going to feel like\n\nFaster than you expect, and weirder than you expect. You'll describe an idea in plain English and Claude will hand you something working in under a minute. The first few times that happens it doesn't quite register. Then it does, and the thing that changes is what you allow yourself to build. The friction that used to stop you — \"I can't build that, I'd have to learn to code\" — stops being friction. That's the actual unlock.\n\nTake your time. Don't skip lessons. The course gets harder, not easier, but each lesson lands better when the one before it landed well.\n\nWhen you're ready, move on to Lesson 2."
          }
        ]
      },
      {
        "num": 2,
        "title": "Sign up for Claude",
        "time": "~3 min",
        "blocks": [
          {
            "type": "prose",
            "md": "Quick lesson. You need a Claude account to take this course.\n\nGo to **claude.ai** in your browser. Click **Sign up**. Use whatever email you check regularly — you'll get verification mail and you'll want to see it land. Pick a strong password.\n\nVerify your email when the confirmation arrives. Sign in.\n\nThat's it. You now have a Claude account.\n\nIf you already had one before starting this course, sign in to it. Don't make a second one — your work, your conversation history, and your eventual paid plan all live on the account you sign in with, and splitting them across two accounts is a headache you'll regret in Module 3.\n\nWhen you're signed in and looking at the Claude home screen, move on to Lesson 3."
          }
        ]
      },
      {
        "num": 3,
        "title": "Pick the right plan and open Claude Design",
        "time": "~5 min",
        "blocks": [
          {
            "type": "prose",
            "md": "This course requires Claude Pro. $20 a month, billed monthly, cancel anytime.\n\nThe reason: this course teaches you to build with **Claude Design** — the part of Claude where you describe an idea and it hands you back working software in a side panel you can interact with. Claude Design is a Pro feature. The Free plan gives you Claude the chatbot, which is excellent for a lot of things but not for what this course is doing. Without Pro, you can read the course but you won't be able to do the course."
          },
          {
            "type": "prose",
            "md": "## If $20/month is the right call for you\n\nClick your profile icon in Claude. Click **Upgrade** or **Settings → Plans**. Pick **Pro**. Add a card. You're in.\n\nOnce you're on Pro, look for **Claude Design** in the Claude interface. Different points of access exist depending on the device, but the most reliable path is: from the chat screen, start a new conversation, and either select Design as the mode or describe something that should be built — Claude will offer to open Design for you.\n\nSpend two minutes orienting. The chat side is where you talk to Claude. The canvas side is where the thing you're building shows up. You can interact with what's in the canvas — click buttons, fill forms, scroll — and tell Claude what's not right. That conversation between the two sides is the entire course."
          },
          {
            "type": "prose",
            "md": "## If $20/month isn't the right call right now\n\nHonest take: most of what this course teaches — how to describe an idea so an AI builds the right thing, when to iterate, when to upload source documents, when to ship — applies to other AI tools too. The specific walkthroughs assume Claude Design because that's the tool I use daily and the one I can teach with confidence. If you skip Pro and use a different AI, the techniques carry over but the screenshots, the examples, and some of the specifics won't match. You'll be doing translation work as you go.\n\nIf that translation work doesn't bother you, the Free plan will get you partway. If it does, come back when Pro fits the budget. The course will still be here.\n\n**When Pro is active and Claude Design is open in your browser, you're ready for Module 1.**"
          }
        ]
      }
    ]
  },
  "1": {
    "title": "Type your idea into Claude, get something back",
    "description": "Build a working interactive prototype of your idea in Claude Design — and iterate until it represents what you actually want to build.",
    "deliverable": "A working interactive prototype of your idea, in a Claude Artifact, that you have iterated on enough that it represents what you actually want to build.",
    "lessons": [
      {
        "num": 1,
        "title": "Open Claude and describe your idea",
        "time": "~8 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Get in front of Claude Design\n\nBefore anything else, you need to be in front of Claude Design.\n\nClaude Design lives at **claude.ai/design**. It's a tool from Anthropic — the company that makes Claude — built specifically for taking a rough idea and turning it into a working interactive prototype in minutes. You need at least a Claude Pro subscription to use it — $20 a month. If you don't have a Claude account yet, sign up at **claude.ai** first, get on Pro, then come back to claude.ai/design. Heavy users sometimes upgrade to Max ($100–$200 a month) because Claude Design shares a weekly compute allowance and design work eats through it, but Pro is enough to start.\n\nWhen you land there, click **Prototype**. Give your project a name — anything works, it's just a label, you can change it later. You'll see two style options: **Wireframe** (sketchy, low-detail) and **High fidelity** (looks like a real, finished website or app). Pick High fidelity. Click **Create**.\n\nTwo panels appear: chat on the left, the canvas on the right. Right now the canvas says \"Creations will appear here.\" That changes in a few minutes."
          },
          {
            "type": "prose",
            "md": "## Type your idea, in one sentence\n\nLook at the chat panel on the left. Stacked above the input box you'll see a \"Start with context\" section with four buttons — Design System, Add screenshot, Attach codebase, Drag in a Figma file — and three pre-applied tags: *Hi-fi design*, *Interactive prototype*, *Design System*. Ignore all of that for now. The only thing you need to do is type into the box that says **\"Describe what you want to create...\"**\n\nHere's what to type: your idea, in one sentence, the way you'd describe it out loud to someone who asked what you were working on.\n\nNot a feature list. Not a brief. Not a spec. A sentence.\n\nSomething like:\n\n> *\"I want a tool that helps me keep track of the plants in my garden — when I planted them, when they need watering, what I've harvested.\"*\n\nOr shorter:\n\n> *\"Build me a website for tracking which clients I haven't talked to in three weeks.\"*\n\nOr even shorter than that. The casual, half-formed version of your idea is the right version. Even a typo or a missing word is fine. The product is forgiving by design.\n\nHit **Send**."
          },
          {
            "type": "prose",
            "md": "## \"Decide for me\" is the most important option in this lesson\n\nHere's what's about to happen, and it's the part that surprises most people: Claude Design isn't going to start building yet. It's going to ask you a handful of structured questions first. *What kind of site is this? Which screen should be the hero? What aesthetic direction? Site name? How interactive should it feel?* Each question has a few options as buttons — and on almost every question, there's an option called **\"Decide for me.\"**\n\nThat option is the most important thing in this lesson.\n\nYou don't need to know the answers. You don't need a strong opinion on aesthetic direction or layout style. If you have one, pick it. If you don't, pick \"Decide for me\" and Claude Design fills in the gap with something reasonable. You can change anything later. Nothing here locks you in.\n\nThat's why the casual one-sentence prompt works. The product is built to ask you the right questions back. Your job at the start isn't to know what you want — it's to start the conversation. The clarity emerges from the back-and-forth, not from preparation.\n\nAnswer the questions. Click **Continue**.\n\nNow Claude Design starts building. Lesson 2 walks you through what you'll see."
          }
        ]
      },
      {
        "num": 2,
        "title": "The Claude Design canvas: what just happened",
        "time": "~10 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## What just happened\n\nYou sent one sentence, answered a few questions, and a working website appeared. Take a breath.\n\nThere's a lot on the screen now, and most of it you'll never need to think about. Inside Claude Design there are three surfaces that actually matter. Once you know them, the rest of the interface gets out of your way."
          },
          {
            "type": "prose",
            "md": "## The canvas\n\nThe canvas is the big right-hand pane showing your prototype. It's not a video and it's not a screenshot. It's a real interactive thing. Click on a button. Type in a search bar. Hover over a card. Whatever Claude Design built for you, it works. The canvas is showing you what your idea actually looks like when it's running, not a mockup of what it might look like.\n\nYou can't break anything. Click everything. The whole point of this surface is that you can react to what you actually have rather than what you think you have.\n\nA few things worth knowing while you're in here. The tab strip across the top of the canvas usually has a **Design Files** tab and at least one more tab named after your project's main file — that named tab is your live prototype. In the top right there's a **Present** button. Click it and your prototype goes full-screen with the Claude Design interface stripped away. That's what your idea looks like to a real user. Press Escape to come back."
          },
          {
            "type": "prose",
            "md": "## The file browser\n\nClick the **Design Files** tab. The canvas changes — now you're looking at a list of files grouped under headings like Components, Stylesheets, and Scripts.\n\nThose are the actual building blocks of your prototype. Real code, sitting in real files. When Claude Design produced what you're seeing on the canvas, it wrote a small project's worth of code in the background to make it work.\n\nYou don't need to read any of it. You don't need to know what a component or a stylesheet is. The file browser is here for two reasons.\n\nFirst, it's evidence. The thing on the canvas is backed by real software, not magic. That matters later, in Module 2, when you take this prototype out of Claude Design and turn it into something you can actually deploy.\n\nSecond, it's where iteration leaves traces. Each time you change something, the files here update. New files appear. Old ones get rewritten. You don't have to watch — but if you ever wonder \"did that change actually happen?\", the file list is where you look.\n\nClicking a file opens a small preview on the far right with its name, size, and when it was last modified. Close it whenever and click back to your prototype tab."
          },
          {
            "type": "prose",
            "md": "## The Tweaks panel\n\nThis one's the gift. Look at the right edge of the canvas. There's usually a panel called **Tweaks**, sometimes tucked behind a small toggle near the top of the canvas. Open it.\n\nInside are dropdowns, sliders, and option buttons for things like theme color, layout density, grid columns, card style. The exact controls depend on what kind of prototype you built. Drag a slider. Pick a different color. Watch the prototype change in real time, with no prompt to write.\n\nThis surface exists because not every change needs to be a conversation. Some changes — \"make it pink instead of blue,\" \"use three columns instead of four,\" \"make the cards smaller\" — are faster as a click than as a sentence. The Tweaks panel handles those.\n\nYou'll still do most of your bigger iteration through the chat. Tweaks is for fine-tuning the things Claude Design already knew you'd want to tune. The two work together."
          },
          {
            "type": "widget",
            "kind": "QuickCheck",
            "props": {
              "question": "Which surface tells you what your idea looks like running, not just a mockup?",
              "choices": [
                "The Design Files tab.",
                "The canvas.",
                "The Tweaks panel."
              ],
              "correctIndex": 1,
              "explain": "The canvas is the live prototype — clickable, interactive, real. The Design Files tab shows the code behind it; Tweaks lets you fine-tune cosmetics."
            }
          },
          {
            "type": "prose",
            "md": "## The chat panel\n\nDon't forget about the chat panel on the left. It looks quiet right now because you're past the questions phase, but it's where the next round of iteration happens. The input box at the bottom that used to say *\"Describe what you want to create...\"* is now an input box for changes — telling Claude Design what to add, fix, or rebuild. The next lesson is about that loop.\n\nFor now, take a few minutes and play. Click into the canvas and use your prototype the way a real user would. Open the file browser once, look at what's there, close it. Open the Tweaks panel and change at least one thing — color, density, anything — just to feel how immediate it is. When you've done all three, you're ready for the next lesson."
          }
        ]
      },
      {
        "num": 3,
        "title": "Iterate by reacting, not by planning",
        "time": "~10 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Drop the instinct to plan\n\nMost people, the first time they sit down with Claude Design, get stuck before they ever start typing. They look at the prototype, decide it's not quite right, and then freeze because they don't know what to ask for next. They feel like they need to figure out the *full* answer before they say anything.\n\nThat's the wrong instinct. Drop it now and the rest of this gets dramatically easier.\n\nYou don't need to know what you want. You need to know what's wrong with what you're looking at.\n\nThose are different jobs. The first one — knowing what you want — is hard. It's the kind of thing professional designers spend years learning to do from a blank page. The second one — knowing what's wrong with something already in front of you — is something you do effortlessly every day. You walk into a room and notice the lamp is in the wrong corner. You read an email and feel that one sentence is off. You don't need a framework for that. You just react.\n\nClaude Design is built for the second job, not the first. It already gave you something. Your only job now is to react to it."
          },
          {
            "type": "prose",
            "md": "## How the loop works\n\nLook at your prototype. Find one thing that's wrong, missing, or off. Just one. Don't make a list. Don't try to spot everything. Pick one.\n\nThen go to the chat panel on the left and describe that one thing in plain language. The way you'd describe it to a coworker leaning over your shoulder.\n\nIt looks like this:\n\n> *\"The cards are too big — I want to see more of them on the screen at once.\"*\n>\n> *\"There's no way to mark something as done. Add a checkbox or a button.\"*\n>\n> *\"The colors feel too corporate. Make it warmer — earth tones instead of blue.\"*\n>\n> *\"Move the search bar to the top of the page, where I'd actually look for it.\"*\n\nHit Send. Claude Design changes the thing. Sometimes it asks a clarifying question first — answer it casually, the same way you'd answer a question from a friend. Then look at what came back.\n\nNow do it again. Find the next wrong thing. Send. Repeat.\n\nThat's the entire loop. It's not glamorous and it's not complicated. It's the work."
          },
          {
            "type": "prose",
            "md": "## Two kinds of iteration\n\nYou have two ways to change your prototype.\n\nThe chat panel handles big changes — anything that needs new content, new behavior, new pages, new logic. *Add a calendar view. Let me filter by category. Show me the user's name in the corner.* These are conversations.\n\nThe Tweaks panel on the right handles fine-tuning — color, density, layout, spacing, the size of the cards, the style of the logo. These are clicks. Drag a slider. Pick an option from a dropdown. Watch the prototype update.\n\nThe wrong move is to use the chat for things the Tweaks panel handles. Don't write *\"make the cards smaller and use four columns instead of three\"* in chat when there are sliders right there for it. The chat is too slow for that and the result is less precise. Use the panel.\n\nThe other wrong move is the opposite — trying to fight a big structural change with the Tweaks panel. If you need a whole new section, a new feature, or a different page, that's a chat job. Don't go hunting through dropdowns for it.\n\nYou'll feel the difference quickly. When something is in the panel, the panel is faster. When it isn't, you write a sentence."
          },
          {
            "type": "widget",
            "kind": "WorkflowSorter",
            "props": {
              "bucketLeft": {
                "id": "tweaks",
                "label": "Tweaks panel"
              },
              "bucketRight": {
                "id": "chat",
                "label": "Chat"
              },
              "tasks": [
                {
                  "id": "t1",
                  "label": "Change the color from blue to warm earth tones",
                  "answer": "tweaks",
                  "why": "Cosmetic — there's a slider for it. Faster than a sentence."
                },
                {
                  "id": "t2",
                  "label": "Add a calendar view to the dashboard",
                  "answer": "chat",
                  "why": "New feature with new behavior. That's a conversation."
                },
                {
                  "id": "t3",
                  "label": "Make the cards smaller to fit more on screen",
                  "answer": "tweaks",
                  "why": "Spacing and density live in the panel as dropdowns or sliders."
                },
                {
                  "id": "t4",
                  "label": "Add a way to filter results by category",
                  "answer": "chat",
                  "why": "New logic that didn't exist before. Tweaks panel won't have a slider for that."
                },
                {
                  "id": "t5",
                  "label": "Switch from 3 columns to 4 columns",
                  "answer": "tweaks",
                  "why": "Layout is a panel job. Don't write a sentence when there's a click."
                },
                {
                  "id": "t6",
                  "label": "Show the user's name in the corner of every page",
                  "answer": "chat",
                  "why": "Content + structure change across pages. That's chat territory."
                }
              ]
            }
          },
          {
            "type": "prose",
            "md": "## Reference materials surface naturally\n\nHere's something that surprises people the first time it happens. As you iterate, you'll start hitting moments where Claude Design is making things up.\n\nMaybe it invented a category for your products that doesn't actually exist in your business. Maybe it's showing fake numbers in a way that doesn't match how you actually count things. Maybe it built a workflow with steps your real workflow doesn't have, or skipped steps your real workflow needs.\n\nThat's not a bug. Claude Design is filling in plausible details because you didn't give it the real ones. The fix isn't to argue with it in chat. The fix is to show it the real thing — the actual document, the actual screenshot, the actual list. That's Lesson 4's whole topic and you'll hit it when you hit it.\n\nFor now, just notice when it happens. The moment you find yourself typing *\"actually, the way it really works is...\"* — stop. That's a signal. You're about to describe in words something you could just upload."
          },
          {
            "type": "prose",
            "md": "## Don't try to make it perfect in one round\n\nA common trap: getting one thing fixed, then immediately trying to fix everything else in the next prompt, then getting frustrated when the next version misses three of the five things you asked for.\n\nThe reason that happens is mechanical. Big prompts produce loose changes. Small prompts produce precise ones. If you ask for five things at once, Claude Design has to make tradeoffs you can't see, and some of them will land wrong.\n\nThe fix is the same fix you'll use forever as a builder: one thing per round. It feels slower. It isn't. The version you get to in five small rounds is closer to right than the version you get to in one giant round, every single time."
          },
          {
            "type": "prose",
            "md": "## When to stop iterating\n\nYou'll know. The prototype starts feeling like the thing you actually want to build instead of a rough sketch of it. The corrections get smaller. You stop spotting major things wrong and start spotting nitpicks.\n\nThat's the signal. Lesson 5 is about what to do at that moment. Don't keep iterating past it — at some point you'll start fighting yourself, undoing changes, getting precious about details that don't matter yet.\n\nFor now, just keep reacting. Find one wrong thing. Fix it. Find the next. The clarity you didn't have when you started is going to show up about ten rounds in, and you won't have planned for any of it."
          }
        ]
      },
      {
        "num": 4,
        "title": "Upload your real source documents, and screenshot what's not right",
        "time": "~10 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## The signal\n\nYou're a few rounds into iterating. The prototype is closer to what you want, but something keeps going sideways. Claude Design has invented a rule that doesn't match how things actually work. Or it's showing fake data that's almost right but not quite. Or you've corrected the same detail three times and it keeps drifting back to wrong.\n\nThis is the lesson where you stop typing and start uploading.\n\nYou're about to type *\"actually, the way it really works is...\"* followed by a long explanation. Or *\"no, that field should be...\"* followed by a definition. Or *\"the form has the following sections...\"* followed by a list.\n\nStop typing.\n\nIf you have to *describe in words* something that already exists as a document, a form, a screenshot, or a spreadsheet — you're doing the wrong job. Words are lossy. The real thing isn't.\n\nClaude Design reads files. Real PDFs, real images, real spreadsheets, real screenshots. When you upload one, Claude Design works from the actual content instead of from your description of it. That's almost always closer to right."
          },
          {
            "type": "prose",
            "md": "## How to upload\n\nThere are two places you can put a file, and they do slightly different things.\n\n**Drop a file directly into the chat panel.** Drag a PDF, image, or document straight onto the chat input box on the left. It attaches to your next message. Type whatever change you want — *\"use this as the rule for how invoices get categorized\"* or *\"build the form to match this screenshot\"* — and send. Claude Design treats the file as the authoritative source for what you're asking about.\n\n**Drop a file into the canvas.** The canvas has a drop zone at the bottom — *\"DROP FILES HERE — Images, docs, references, Figma links, or folders — Claude will use them as context.\"* Use this when you're adding reference material for the project as a whole, not for a single change. Things you drop here become part of the project's context and Claude Design can refer back to them across multiple iterations.\n\nFor most early uploads, the chat panel is the right answer. It's tied to the specific change you're making."
          },
          {
            "type": "widget",
            "kind": "WorkflowSorter",
            "props": {
              "bucketLeft": {
                "id": "upload",
                "label": "Upload the real thing"
              },
              "bucketRight": {
                "id": "describe",
                "label": "Describe in words"
              },
              "tasks": [
                {
                  "id": "t1",
                  "label": "Your prototype involves the actual invoice categorization rules from your company policy",
                  "answer": "upload",
                  "why": "Upload the policy document. Don't paraphrase it — the document is the authoritative source."
                },
                {
                  "id": "t2",
                  "label": "You want to change the color of the header from blue to green",
                  "answer": "describe",
                  "why": "Cosmetic, no real-world reference exists. One sentence is enough."
                },
                {
                  "id": "t3",
                  "label": "The form should match the exact fields, order, and section breaks of your paper intake form",
                  "answer": "upload",
                  "why": "Take a photo or PDF of the real form. Claude will see all of it — labels, order, sections — at once."
                },
                {
                  "id": "t4",
                  "label": "You want a \"Welcome\" message to greet new users",
                  "answer": "describe",
                  "why": "Generic, low-stakes content. Chat handles it in one go."
                },
                {
                  "id": "t5",
                  "label": "The data should look like the export from your existing CRM system",
                  "answer": "upload",
                  "why": "A few rows of real data teaches Claude more than a paragraph of explanation."
                },
                {
                  "id": "t6",
                  "label": "You spot a layout bug — two cards overlapping in a weird way",
                  "answer": "upload",
                  "why": "Screenshot it. The picture does the work for you. One sentence + image beats three paragraphs of description."
                }
              ]
            }
          },
          {
            "type": "prose",
            "md": "## What to upload\n\nThe rule is simple: upload the real thing instead of describing it.\n\nIf your prototype involves rules, upload the actual rule document. The PDF, the policy page, the regulation, the company handbook section — whatever defines the rules in the world your idea lives in. Don't paraphrase it. Don't summarize it. Hand over the document.\n\nIf your prototype involves forms, upload pictures or PDFs of the actual forms. The fields, the labels, the order, the section breaks — Claude Design will see all of it and build the digital version to match.\n\nIf your prototype involves data, upload a real example. A spreadsheet, an export, a screenshot of how the data looks in whatever system holds it today. A few rows of real data teaches Claude Design more than a paragraph of explanation.\n\nIf your prototype involves a workflow that already exists in some other tool — a current system, a paper process, a competitor — upload screenshots of that. Don't try to describe what the screen looks like. Show it."
          },
          {
            "type": "prose",
            "md": "## The screenshot habit\n\nThere's a second move that pairs with uploading documents, and it's just as important.\n\nWhen something looks wrong on the screen, screenshot it. Drag the screenshot into the chat. Type one sentence about what's wrong. Send.\n\nThat's it. You don't need to describe the position, the size, the color, the broken layout, the missing element. Claude Design can see the picture. *\"This card is overlapping this other card\"* with a screenshot is faster and more accurate than three paragraphs of explanation without one.\n\nThis is going to feel almost too easy. Trust it. The screenshot does most of the work for you.\n\nA few moments where the screenshot habit pays back the most:\n\n- The layout looks broken on your screen but you can't quite describe how.\n- A specific element — a button, a card, a section — is wrong and you don't know the technical name for it.\n- Something works on your laptop but breaks on your phone, or the other way around.\n- You see something visually weird and can't tell if it's a mistake or intentional.\n\nScreenshot it. Drop it in. One sentence. Send."
          },
          {
            "type": "prose",
            "md": "## What this skill becomes\n\nThis isn't just a Module 1 thing. The capture-and-share habit you're building right now — drop the real document in, screenshot what's broken, send it with one line — is the single most important skill you'll use across the whole rest of the course.\n\nWhen you get to Module 3 and you're looking at error messages from Claude Code, you'll screenshot them and send them. When you get to Module 4 and a deploy fails, you'll screenshot the failure logs and send them. When you get to Module 5 and the backend isn't connecting to the database, you'll screenshot whatever you can see and send it.\n\nYou don't have to understand any of it. You just have to capture it. Capture is the skill. Understanding is something Claude does on the other side.\n\nIf you only learn one thing in this whole course, learn this. Most people who get stuck building software get stuck because they're trying to describe in words something that's already on their screen. The fix is always the same: capture what's there, drop it in, ask for the fix."
          }
        ]
      },
      {
        "num": 5,
        "title": "When the prototype is \"good enough,\" ask Claude Design to package it",
        "time": "~7 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## \"Good enough\" is a real thing\n\nYou've been iterating. The prototype is starting to feel like the thing you actually want to build instead of a sketch of it. The corrections are getting smaller. You're spotting nitpicks instead of missing pieces.\n\nThat's the moment.\n\nThis lesson is about recognizing it, then doing the one thing that turns your prototype into something you can keep building on outside Claude Design.\n\nA lot of builders, the first time they get here, don't stop. They keep iterating. They want it to be perfect before they call it done. They've been having fun shaping it and they don't want to leave the conversation.\n\nDon't do that. The prototype isn't supposed to be the finished product. It's supposed to be a clear-enough version of your idea that you can do real work on top of it — adding features, hooking up real data, deploying it so other people can use it. All of that happens in the next modules, not this one."
          },
          {
            "type": "prose",
            "md": "## The three criteria\n\n\"Good enough\" means three things, all at once:\n\n- **The shape is right.** The major sections, screens, or features you imagined are there. Not polished. Just present.\n- **The biggest wrong things are fixed.** The stuff that made you say \"no, that's not how it works\" the first few rounds — those are corrected.\n- **What's left is small.** Color tweaks. Wording. Tiny layout adjustments. Things you could spend an hour on or skip entirely without changing what the thing fundamentally *is*.\n\nIf all three are true, you're done with Module 1. Stop iterating. Move on. You will revisit and improve every part of this later — that's what the rest of the course is.\n\nIf only two are true, do one or two more rounds. Then check again."
          },
          {
            "type": "widget",
            "kind": "QuickCheck",
            "props": {
              "question": "Your prototype has all the screens. The big wrong things are fixed. You're now spending time on tiny color tweaks and wording. What do you do?",
              "choices": [
                "Keep iterating until every nitpick is gone.",
                "Stop. Ship Module 1 and move on. You will revisit every part of this later.",
                "Start over with a fresh prototype to get the colors right."
              ],
              "correctIndex": 1,
              "explain": "Right. All three criteria for 'good enough' are met. Keep going past this point and you'll fight yourself, undo changes, get precious. Stop and move on to Module 2."
            }
          },
          {
            "type": "prose",
            "md": "## Ask for the package\n\nOnce you're at \"good enough,\" go to the chat panel and type something like this:\n\n> *\"Package all of this into a downloadable zip file I can keep working on. I want to take it out of Claude Design and continue building it as a real project.\"*\n\nOr shorter:\n\n> *\"Give me a downloadable version of this project. I want to keep building on it outside Claude Design.\"*\n\nSend it.\n\nClaude Design will package the project — all the components, stylesheets, scripts, and supporting files you saw in the file browser — into a single ZIP file you can download to your computer.\n\nThat ZIP is the bridge. Everything from Lesson 2 onward — the canvas, the file browser, the Tweaks panel — was Claude Design's house. Now you're taking the project out of that house. From this point on, your prototype is a folder of files on your computer. It belongs to you. You can open it anywhere, on any computer, and keep working on it."
          },
          {
            "type": "prose",
            "md": "## Save the ZIP somewhere you'll find it\n\nDownload the ZIP. Move it to a place on your computer where you can find it again — your Desktop, your Documents folder, wherever you keep work you're going to come back to. Don't unzip it yet. Module 2 covers what to do with it next, and the first step of Module 2 is going to ask you exactly where this file lives.\n\nDon't close your Claude Design project either. Keep the browser tab open or bookmark the project URL. You'll want the ability to come back to the live prototype as a reference — to see the visual version of what you're working on, or to ask Claude Design for one more change if you discover something missing later."
          },
          {
            "type": "prose",
            "md": "## What you have right now\n\nTake a moment.\n\nWhen you opened Lesson 1, you had an idea. Maybe a clear one, maybe a vague one. You typed it as one sentence into a tool you'd never used before.\n\nNow you have a working interactive prototype of that idea. It runs. You can click in it. You can show it to somebody and have them understand what you're building. The biggest wrong things are corrected. The shape matches what's in your head. You have a downloadable ZIP of the whole thing sitting on your computer.\n\nThat's what Module 1 was for. You did it.\n\nModule 2 is about taking that ZIP and turning it into a real project — one that lives on the internet, one you can deploy, one other people can use. The shape of the work changes a little. You'll meet some new tools. The skills you've already built — typing casually, reacting to what you see, capturing what's in front of you, uploading the real thing — all carry forward. None of it gets harder than what you just did.\n\nWhen you're ready, open Module 2."
          }
        ]
      }
    ]
  },
  "2": {
    "title": "Take your prototype out of chat and into a real codebase",
    "description": "Move your prototype from Claude Design into a GitHub repo that Claude Code can work with.",
    "deliverable": "A GitHub repository containing your prototype, with Claude Code connected and able to make changes.",
    "lessons": [
      {
        "num": 1,
        "title": "What just happened — your prototype is now a folder of files",
        "time": "~5 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## You have a ZIP. You won't use it directly.\n\nAt the end of Module 1, Claude Design handed you a ZIP file. **You don't actually open it.** It's a backup — proof that your prototype's code exists on your computer if you ever need it.\n\nThe real flow is: GitHub holds your project, Claude Code reads it from GitHub, and you make changes through Code. The ZIP just sits in your Downloads folder as insurance."
          },
          {
            "type": "prose",
            "md": "## What we're doing in Module 2\n\nIn five short lessons, you'll:\n\n1. Save the ZIP somewhere you can find it (this lesson — 30 seconds).\n2. Make a GitHub account and an empty repository (Lesson 2).\n3. Install Claude Code on your computer (Lesson 3).\n4. Connect Claude Code to GitHub (Lesson 4).\n5. Push your prototype to GitHub for the first time (Lesson 5).\n\nBy the end, your prototype lives on GitHub, and Claude Code works against the GitHub copy. **You never edit local files by hand.** Everything goes through Code, and Code syncs with GitHub."
          },
          {
            "type": "prose",
            "md": "## Save the ZIP\n\nFind the ZIP in your Downloads folder. Move it somewhere you'll remember — Desktop is fine, or a folder you keep work in.\n\nDon't unzip it. Don't open it. **It's a backup, not a workspace.** Move on to Lesson 2."
          }
        ]
      },
      {
        "num": 2,
        "title": "Make a GitHub account and create your first repository",
        "time": "~6 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## What GitHub is\n\nGitHub is a website where code lives — somebody else's computer, holding your project so it doesn't only exist on your laptop. Every change you make from here on gets pushed there. **If your laptop dies tomorrow, your project doesn't.**\n\nIt's free for everything we're doing. You don't need a paid plan, ever, for the work in this course."
          },
          {
            "type": "prose",
            "md": "> **Don't guess. Capture.**\n>\n> If something goes wrong — a deploy fails, a button isn't where the lesson said it would be, an error you don't recognize shows up — **you do not need to understand any of it.** You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.\n>\n> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what is this error?\"* — Chat will tell you exactly what to fix and exactly what prompt to send Claude Code (or which field to change in GitHub / Render / Cloudflare).\n>\n> I have not hit a single obstacle that this loop didn't solve. **Use it every time.**"
          },
          {
            "type": "prose",
            "md": "## Sign up at github.com\n\nGo to **github.com**. Click **Sign up** in the top-right.\n\nYou'll need three things: an email (use one you check), a password, and a username — this becomes part of your project's URL forever, so pick something you're okay with. *kgundy1*, *yourname2026*, whatever. Skip the survey GitHub asks at the end — pick any answers, it doesn't change anything.\n\nGitHub will send you a verification email. Click the link. **You now have a GitHub account.**"
          },
          {
            "type": "widget",
            "kind": "Screenshot",
            "props": {
              "slotId": "gh-signup",
              "placeholder": "Drop a screenshot of GitHub.com/signup here",
              "caption": "GitHub sign-up page — github.com/signup. Drag a screenshot of the page you see when you click \"Sign up\" so learners can confirm they're in the right place."
            }
          },
          {
            "type": "prose",
            "md": "## Create your first repository\n\nA *repository* — \"repo\" for short — is one folder GitHub holds for you. One per project. We're going to make the one for what you built in Module 1.\n\nIn the top-right of any GitHub page there's a **+** button. Click it → **New repository**.\n\nFill in the name — something short, lowercase, no spaces. The name of your project from Module 1 is the right answer. Description is optional. Pick **Public** or **Private** — both work; Public means people can see your code if they find it (most learning repos are public), Private means only you.\n\n**Important:** the page has three checkboxes at the bottom — *Add a README*, *Add .gitignore*, *Choose a license*. **Leave them all unchecked.** Your prototype already has its own files, and adding these will cause headaches in Lesson 5.\n\nClick **Create repository**."
          },
          {
            "type": "widget",
            "kind": "Screenshot",
            "props": {
              "slotId": "gh-new-repo",
              "placeholder": "Drop a screenshot of the \"Create a new repository\" page",
              "caption": "GitHub → top-right \"+\" → \"New repository\". The page where you name the repo + click Create."
            }
          },
          {
            "type": "prose",
            "md": "## What you see now\n\nThe page that loads is mostly empty — a header with your repo's URL, some setup instructions you can ignore, and a big code block titled *Quick setup*. **Ignore all of it.** Claude Code is going to handle the pushing in Lesson 5; you don't run any of these commands by hand.\n\nLeave this tab open. Move to Lesson 3."
          }
        ]
      },
      {
        "num": 3,
        "title": "Get Claude Code on your computer",
        "time": "~7 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Two different Claudes\n\nClaude Chat — the website at claude.ai — is what you've been using. **Claude Code is different.** It's a separate app that runs on your computer and works directly with the code in a GitHub repository. Chat reads your messages; Code reads your repo."
          },
          {
            "type": "prose",
            "md": "> **Don't guess. Capture.**\n>\n> If anything in the installer looks unfamiliar — a checkbox you don't recognize, a permissions dialog, an option you've never seen — **don't guess.** Screenshot it, drag it into Claude Chat, and ask *\"what is this?\"* Chat will tell you exactly what to do.\n>\n> Use this loop every time. **I have not hit a single obstacle it didn't solve.**"
          },
          {
            "type": "prose",
            "md": "## Install it\n\nGo to **claude.com/code**. You'll see download options for Mac and Windows.\n\n**Mac:** download the `.dmg`, double-click it, drag the Claude Code icon into your Applications folder. Open it from there.\n\n**Windows:** download the installer (`.exe`), run it, click through. It'll land in your Start menu.\n\nFirst launch: it asks you to sign in. **Use the same Claude account as your Pro subscription.** Same email, same password. Don't make a new account. Pro covers Claude Code at no extra cost."
          },
          {
            "type": "prose",
            "md": "## Code works from GitHub, not local files\n\nThis is the part that surprises people the first time. **Claude Code doesn't point at the folder on your Desktop.** It works against your GitHub repository directly.\n\nWhen you finish a session in Claude Code, the changes are *committed and pushed to GitHub.* When you start a new session, Code *pulls the latest from GitHub.* The local copy on your computer is automatically managed — you don't open it, you don't edit it, you don't even need to know where on disk it lives.\n\n**GitHub is the source of truth. Code is the editor. You're the conversation partner.** That's the entire shape of the workflow."
          },
          {
            "type": "prose",
            "md": "## What you have so far\n\nClaude Code is installed and signed in. Module 1's ZIP is on your computer as a backup. The next two lessons connect Code to GitHub (Lesson 4) and push your prototype up for the first time (Lesson 5). **After that, you'll never think about the ZIP or the local folder again.**"
          }
        ]
      },
      {
        "num": 4,
        "title": "Connect Claude Code to GitHub",
        "time": "~5 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Why this step exists\n\nClaude Code needs permission from you to do anything with GitHub — push files, read branches, see your repos. GitHub uses a standard *authorization* flow for that: a popup window where GitHub asks *\"do you trust this app to do X with your account?\"* and you say yes.\n\n**You do this once, ever.** After today, every push, every PR, every interaction Claude Code has with GitHub uses this same connection."
          },
          {
            "type": "prose",
            "md": "> **Don't guess. Capture.**\n>\n> If something goes wrong — a deploy fails, a button isn't where the lesson said it would be, an error you don't recognize shows up — **you do not need to understand any of it.** You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.\n>\n> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what is this error?\"* — Chat will tell you exactly what to fix and exactly what prompt to send Claude Code (or which field to change in GitHub / Render / Cloudflare).\n>\n> I have not hit a single obstacle that this loop didn't solve. **Use it every time.**"
          },
          {
            "type": "prose",
            "md": "## Start the connection\n\nIn Claude Code, type:\n\n> *\"Connect to GitHub.\"*\n\nThat's literally what you type. Claude Code understands conversational requests. It'll respond with a short message explaining what's about to happen and then either open a browser window automatically or hand you a URL to paste in.\n\nIf a browser window opens — that's GitHub. If it gives you a URL, copy it and paste it into a new browser tab. Either way, you end up at a GitHub page titled **Authorize Claude Code**."
          },
          {
            "type": "widget",
            "kind": "Screenshot",
            "props": {
              "slotId": "cc-github-auth",
              "placeholder": "Drop a screenshot of the Claude Code → GitHub authorization screen",
              "caption": "The GitHub \"Authorize Claude Code\" page. Drag a screenshot here so learners know what to expect when the OAuth window opens."
            }
          },
          {
            "type": "prose",
            "md": "## The Authorize page\n\nGitHub lists what Claude Code is asking for — usually permission to read and write your repositories, see your email, and a few related items. It can look intimidating. **It's fine.** This is the same authorization flow you'd grant any code editor.\n\nThere's a section near the bottom about repository access — usually \"All repositories\" or \"Only select repositories.\" If you only want Claude Code to touch the one repo you just made: pick *Only select repositories* and select the repo. If you don't care: *All repositories* is faster, and you can change it later from GitHub settings.\n\nScroll to the bottom. Click the green **Authorize** button."
          },
          {
            "type": "prose",
            "md": "## Confirmation\n\nGitHub redirects you somewhere — usually a blank-ish page that says \"Authorization successful\" or sends you back to Claude Code automatically. Go back to your Claude Code window. **You should see a confirmation message** — something like *\"GitHub connected as @yourusername.\"*\n\nIf you don't see that confirmation, type *\"Did the GitHub connection work?\"* into Claude Code. It'll tell you. If something's wrong, Claude will walk you through fixing it."
          }
        ]
      },
      {
        "num": 5,
        "title": "Push your prototype to GitHub for the first time",
        "time": "~8 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## The first push\n\nClaude Code is installed and connected to GitHub. The repository you made in Lesson 2 is empty. Module 1's ZIP is sitting on your computer. **Lesson 5 puts them all together.**"
          },
          {
            "type": "prose",
            "md": "> **Don't guess. Capture.**\n>\n> If Claude Code asks a question you don't recognize — what branch to use, whether to add a `.gitignore`, how to handle a conflict — **don't guess.** Screenshot what you see, drag into Chat, ask *\"how should I answer this?\"* Chat will tell you, and tell you exactly what to type back to Code.\n>\n> Every push, every error, every weird dialog — same loop. **It always works.**"
          },
          {
            "type": "prose",
            "md": "## Tell Claude Code where the ZIP is\n\nIn Claude Code, type something like this:\n\n> *\"I have a project ZIP at `<path to your ZIP>` from Claude Design. Push the contents into my GitHub repo at `<username>/<repo-name>`.\"*\n\nReplace `<path to your ZIP>` with where the ZIP lives — on Mac, `~/Downloads/your-project.zip`; on Windows, `C:\\Users\\<you>\\Downloads\\your-project.zip`. If you don't know the path, just drag the ZIP file directly into the Claude Code window — Code reads the path automatically.\n\nReplace `<username>/<repo-name>` with your GitHub username and the repo you made in Lesson 2.\n\nSend it."
          },
          {
            "type": "prose",
            "md": "## What Claude Code does\n\nIn the background, Code unzips the file, initializes git, stages the files, commits them, sets the GitHub repo as the destination, and pushes. You see the output scroll past in the Claude Code window. **Watch, don't intervene.**\n\nIf Code asks a clarifying question — *\"should I use the `main` branch?\"* or *\"do you want me to add a `.gitignore`?\"* — answer casually. **\"Use `main`. Add a sensible `.gitignore`.\"** Code figures out the rest."
          },
          {
            "type": "prose",
            "md": "## Refresh your GitHub tab\n\nGo back to the browser tab you left open on your repo's empty page in Lesson 2. Hit refresh.\n\nThe page that used to say *\"Quick setup\"* is now a full repository view — file names, a commit count of 1, a green *latest commit* badge. **Your prototype now exists on GitHub.**"
          },
          {
            "type": "widget",
            "kind": "Screenshot",
            "props": {
              "slotId": "gh-first-push",
              "placeholder": "Drop a screenshot of your repo page after first push",
              "caption": "GitHub repository page right after the first push — files visible, commit count = 1. The \"this is what success looks like\" reference."
            }
          },
          {
            "type": "prose",
            "md": "## What you've done\n\nFour hours ago, your idea was a Claude Design chat tab. Now it's a repository on GitHub that Claude Code can iterate on. **That's a real project.** It looks like every other one shipped this year.\n\nFrom this point forward you never think about the ZIP again. Every change happens in Claude Code, gets committed to GitHub automatically, and stays there. **The ZIP is just insurance you won't need.**"
          }
        ]
      }
    ]
  },
  "3": {
    "title": "The method that keeps you from getting stuck",
    "description": "Learn the discipline of two-session work: Chat as project manager, Code as builder, and CLAUDE.md as project memory.",
    "deliverable": "A working CLAUDE.md file in your repository describing your project — what it is, what has been built, what is next, and the rules for how Claude Code should work on it.",
    "lessons": [
      {
        "num": 1,
        "title": "What goes wrong when you stay in one Code session too long",
        "time": "~7 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## What 'too long' looks like\n\nYou have one Claude Code session open. You ask it to add a feature. It works. You ask it to fix something. It works. You ask it to refactor a section. It mostly works, but it touched two other files. You ask it to undo just *part* of what it did — and it makes things worse.\n\n**This is what 'too long' looks like.** Not a clock. Not a token count. The session piled up requests until each new change is touching the old ones in ways neither of you can predict."
          },
          {
            "type": "prose",
            "md": "## Why this happens\n\nClaude Code is reading the *whole conversation* every time it acts. Every prompt you've sent. Every file it's read. Every error it's seen. The longer a session goes, the more it has to keep track of — and the more chances there are for it to confuse what you asked five minutes ago with what you asked just now.\n\nThe surface symptom: scope creep. Things change that you didn't ask to change. **The real cause: too much state in one place.** The model is doing its best to honor everything you've said and the everything is now too big."
          },
          {
            "type": "prose",
            "md": "## The mechanical fix\n\nOne task per session. Then close it.\n\nThat's the whole rule. *One thing.* When you finish, close the session and start a fresh one for the next thing. The new session is empty — no memory of what you just did, which means no chance of accidentally undoing it. **Short sessions ship cleanly. Long sessions tangle.**\n\nThis feels wasteful the first few times. It isn't. The cost of restarting is five seconds; the cost of unsnarling a tangled session is an hour."
          },
          {
            "type": "prose",
            "md": "## What 'one task' actually means\n\nA task is: *one thing you could describe in a single sentence and verify in under a minute.*\n\n- *\"Add a search bar to the header\"* — one task.\n- *\"Add a search bar, fix the date format, and refactor the user model\"* — three tasks. Three sessions.\n- *\"Make the login work\"* — too vague to be one task. Break it down first in Chat.\n\nIf you can't write it in one sentence, you're not ready to hand it to Code. Lesson 2 is about why that matters."
          }
        ]
      },
      {
        "num": 2,
        "title": "Claude Chat is your project manager. Claude Code is your builder.",
        "time": "~8 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Two tools, two jobs\n\nYou have two tools open right now: Claude Chat in your browser, Claude Code on your desktop. They share the same brain — same model, same training — but they do different jobs in the workflow.\n\n**Chat is your project manager.** It plans, it discusses, it writes the prompts. It doesn't touch your code. Its job is to think.\n\n**Code is your builder.** It executes the prompts Chat wrote. It edits files, runs commands, pushes commits. Its job is to type."
          },
          {
            "type": "prose",
            "md": "## Why splitting them works\n\nIn one shot, the same Claude can plan and build. You've probably done that in Claude Code already — typed a vague request and watched it figure things out. It works for tiny tasks.\n\nFor anything bigger, it stops working. Chat's planning brain and Code's execution brain are doing different jobs that benefit from different conditions. **Planning wants room to wander.** Execution wants tight scope. Trying to do both in one session is what causes the tangling you read about in Lesson 1.\n\nThe split is what fixes it. **Plan in Chat with no pressure to ship. Execute in Code with no pressure to think.**"
          },
          {
            "type": "prose",
            "md": "## How a session looks\n\nA typical loop, end to end:\n\n1. **Open Claude Chat.** Describe what you want to add or fix. Have a conversation. Let Chat ask clarifying questions. End with a *prompt* — three or four sentences telling Code exactly what to do.\n2. **Open Claude Code.** Paste the prompt. Watch Code execute. Review what it changed.\n3. **Close the Code session.** Go back to Chat. Decide the next thing.\n4. **Repeat.**\n\nThat's it. **You'll do this ten times today, a thousand times this year.** Get the loop in your bones now."
          },
          {
            "type": "prose",
            "md": "## What you don't do\n\nYou don't paste raw thoughts into Code. You don't \"just try things\" in Code. You don't let Code make architectural decisions.\n\nIf you find yourself in Code asking *\"how should I do X?\"* — stop. **That's a Chat question.** Close the Code session, take the question to Chat, work it out there, come back to Code with a precise prompt.\n\nThe discipline is staying on this loop even when it's tempting to skip ahead."
          }
        ]
      },
      {
        "num": 3,
        "title": "Why you are the bridge between the two",
        "time": "~6 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## The handoff\n\nClaude Chat and Claude Code don't talk to each other. They can't see each other's conversations. **The connection between them is you** — copying a prompt from one window, pasting it into the other, then carrying the result back.\n\nThis sounds inefficient. It's the opposite. **It's the safety mechanism.** Bad prompts get caught at the bridge. Bad output gets caught coming back. Every time you carry something across, you read it. Reading is the review."
          },
          {
            "type": "prose",
            "md": "## What you're actually doing\n\nWhen a Chat session ends with a polished prompt, you read it before you paste it into Code. *Does this say what I want? Is the scope tight? Does it mention which file? Does it say what not to touch?* **Five seconds of reading saves an hour of debugging.**\n\nWhen Code finishes a change, you read the diff before approving it. *Did it only touch the file I asked about? Are there unexpected changes? Does the actual code look like what I asked for?* Reading is the entire discipline.\n\nThe model is doing the work. You're the editor."
          },
          {
            "type": "prose",
            "md": "## Build the habit early\n\nThe first ten times you carry a prompt across, you'll feel like you're slowing yourself down. **You're not.** You're building the habit that keeps you out of the mess Lesson 1 described.\n\nAfter twenty times, the carry becomes automatic. You stop thinking about it. The reading-on-the-way happens in your head without effort, and your sessions ship cleanly without you noticing why."
          }
        ]
      },
      {
        "num": 4,
        "title": "Bring everything you see to Chat — text, screenshots, errors, anything",
        "time": "~7 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Capture is the skill\n\nThis is the most important sentence in the whole course: **capture is the skill, not understanding.**\n\nWhen Claude Code shows you an error, you don't need to know what it means. You need to *capture* it — screenshot it, copy-paste it, save the log — and bring it to Chat. Chat reads it and tells you what to do.\n\nWhen Cloudflare's deploy fails, same thing. When Render's database won't connect, same thing. **You don't have to understand any of it.** You have to capture what's there."
          },
          {
            "type": "prose",
            "md": "## What 'capture' includes\n\n- **Error messages** — screenshot the full window, even the parts you don't think matter.\n- **Build logs** — when a deploy fails, the logs are scrollable; screenshot the section that shows red text or the word *error*.\n- **Console output** — in your browser, right-click → Inspect → Console tab. Screenshot whatever's there.\n- **The page itself** — if something *looks* wrong, screenshot the page. Claude can see it.\n- **Configuration screens** — dashboards, settings pages, the thing you're confused about. Screenshot it.\n\nThe format doesn't matter. PNG is fine. Screenshots get pasted directly into Chat by dragging or hitting paste. **Claude can read them.**"
          },
          {
            "type": "prose",
            "md": "## The screenshot habit at scale\n\nEvery dashboard you'll touch in the rest of this course — GitHub, Render, Cloudflare — has settings pages you don't fully understand. The fastest path is always the same: **screenshot, paste into Chat, ask.** Don't read the docs. Don't Google the option names. Show Chat what you're looking at and ask *\"is this set up right?\"*\n\nThe time you save with this habit, over the course of building one real project, is measured in days. It's that big."
          },
          {
            "type": "prose",
            "md": "## Practice now\n\nFlip to any tab in your browser. Take a screenshot of it. Drag the screenshot into Claude Chat. Type: *\"what is this page for?\"* Send.\n\nWhatever Chat says, you've just done the most-used move in the rest of the workflow. **Build the muscle now and it's there when you need it later.**"
          },
          {
            "type": "prose",
            "md": "## The rule that ends every stuck moment\n\nMemorize this and the rest of the work is downhill from here:\n\n> **You do not have to understand errors. You do not have to guess. You just have to capture.**\n\nScreenshot. Paste into Chat. Ask. Every time. **I have not hit an obstacle in this entire workflow that this loop did not solve.** Neither will you."
          }
        ]
      },
      {
        "num": 5,
        "title": "Write your CLAUDE.md — the file every session reads first",
        "time": "~12 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## What CLAUDE.md is\n\nA single markdown file. Named exactly `CLAUDE.md` — capital letters, no spaces, dot-md extension. Sitting at the top level of your repository, right next to `package.json`.\n\nEvery time Claude Code opens your project, it reads this file first — before anything else. **It's how Code remembers your project across sessions.**\n\nWithout it, every new session starts from zero. You spend the first ten minutes re-explaining what the project is, what's built, what the rules are. With it, those ten minutes never happen."
          },
          {
            "type": "prose",
            "md": "## What goes in it\n\nA good CLAUDE.md has six sections:\n\n- **What this is** — one paragraph. The project's name, who it's for, the core idea.\n- **Current Status** — a table of what's live, what's in progress, what's not built.\n- **Architecture** — the stack. *Frontend in X, backend in Y, deployed on Z.*\n- **Repo Layout** — the file tree with one-line annotations per major folder.\n- **What's built / not built** — explicit, so Code doesn't suggest rebuilding things that already exist.\n- **Conventions** — branch names, commit format, deploy behavior, any hard rules.\n\nThe length isn't the point. **Specificity is.** A 200-line CLAUDE.md full of facts beats a 600-line one full of waffle."
          },
          {
            "type": "prose",
            "md": "## Have Chat write the first draft\n\nGo to Claude Chat. Type:\n\n> *\"I have a project at <github URL>. I want you to help me write the first version of CLAUDE.md — a project memory file that lives at the root of the repo and that Claude Code reads at the start of every session. Ask me whatever questions you need to understand the project, then propose a CLAUDE.md.\"*\n\nChat will ask 5-10 questions. Answer them casually. **End the conversation with a CLAUDE.md you can copy.**\n\nThen open Claude Code. Tell it: *\"Create a file called CLAUDE.md at the project root with the following contents:\"* and paste what Chat gave you. Code creates the file. Commit it. Push it. **You now have project memory.**"
          },
          {
            "type": "prose",
            "md": "## Keep it current\n\nThe value of CLAUDE.md decays if it lies. If the file says one thing and the code says another, future Code sessions get contradictory advice.\n\nThe habit: after every feature you ship, end the Chat session with *\"propose the CLAUDE.md update for what we just did.\"* Push the update to main directly — no PR, no review, it's a documentation update. **Drift is the enemy of CLAUDE.md.** Keep it honest, keep it short, keep it updated."
          }
        ]
      }
    ]
  },
  "4": {
    "title": "Get your prototype on the internet",
    "description": "Deploy your prototype to the internet so anyone with the URL can use it.",
    "deliverable": "Your prototype, deployed to the internet at a live URL you can open in any browser and share with anyone.",
    "lessons": [
      {
        "num": 1,
        "title": "What \"deploying\" actually means",
        "time": "~6 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## GitHub stores. Cloudflare runs.\n\nGitHub is a filing cabinet. It holds your code. It doesn't execute it. Nobody can visit your repository URL and *use* the app you built — they'd see code, not a working website.\n\n**Deploying** is the step that puts your code on a server somewhere, so anyone with the URL can use it like a normal website. Module 4 is about doing that, for free, with a service called Cloudflare Pages."
          },
          {
            "type": "prose",
            "md": "## Why Cloudflare Pages\n\nFor the kind of prototype you built in Module 1 — a frontend, no backend yet — Cloudflare Pages is the right choice. It connects directly to GitHub, deploys automatically when you push, and the free tier covers everything you need: **unlimited bandwidth, 500 builds a month, custom domains, HTTPS by default.**\n\nYou will never pay Cloudflare for the work in this course. Some teams pay them later for advanced features, but the free tier is what your project lives on."
          },
          {
            "type": "prose",
            "md": "## What's about to happen\n\nFive minutes from now, you'll have a URL ending in `.pages.dev` that loads your prototype. You can paste it into a text to your spouse, your partner, your sister, your boss. **They click it and they see your idea running.**\n\nThe rest of this module is the mechanical setup: make a Cloudflare account, connect it to your GitHub repo, watch the first deploy succeed. Lesson 2 starts the connect."
          }
        ]
      },
      {
        "num": 2,
        "title": "Make a Cloudflare account and connect your GitHub repository",
        "time": "~7 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Make a Cloudflare account\n\nGo to **cloudflare.com** and click **Sign up** in the top-right. Email, password, that's it. They'll send a verification email — click the link.\n\nWhen you log in, you land on a dashboard with a left sidebar. **That sidebar is your map.** Most of Cloudflare's product surface is irrelevant for what we're doing here — domains, DNS, security, all of that. The only section you care about is **Workers & Pages.**"
          },
          {
            "type": "prose",
            "md": "> **Don't guess. Capture.**\n>\n> If something goes wrong — a deploy fails, a button isn't where the lesson said it would be, an error you don't recognize shows up — **you do not need to understand any of it.** You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.\n>\n> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what is this error?\"* — Chat will tell you exactly what to fix and exactly what prompt to send Claude Code (or which field to change in GitHub / Render / Cloudflare).\n>\n> I have not hit a single obstacle that this loop didn't solve. **Use it every time.**"
          },
          {
            "type": "prose",
            "md": "## Get to Pages\n\nIn the left sidebar, click **Workers & Pages**. On the page that loads, you'll see two tabs near the top: *Overview* and a few others. Click **Create application**.\n\nA new screen appears with two tabs: **Workers** and **Pages**. You want Pages. Click the **Pages** tab.\n\nIn the Pages tab, the first option is **Connect to Git**. Click that button."
          },
          {
            "type": "widget",
            "kind": "Screenshot",
            "props": {
              "slotId": "cf-pages-connect",
              "placeholder": "Drop a screenshot of Cloudflare Pages → Connect to Git",
              "caption": "Cloudflare → Pages → \"Create application\" → \"Pages\" tab → \"Connect to Git\" button. The single most missed step in this whole module."
            }
          },
          {
            "type": "prose",
            "md": "## Authorize Cloudflare on GitHub\n\nCloudflare asks for permission to read your GitHub repos — same flow Claude Code went through in Module 2 Lesson 4. **Click Connect GitHub.** A GitHub authorization page opens.\n\nGitHub will let you choose: authorize *all repositories* or *only select repositories*. Either works. \"Only select\" is slightly safer — you can pick just the repo you made in Module 2. If you do that, make sure the dropdown shows the right repo selected.\n\nClick **Authorize** at the bottom of GitHub's page. You bounce back to Cloudflare."
          },
          {
            "type": "widget",
            "kind": "Screenshot",
            "props": {
              "slotId": "cf-repo-picker",
              "placeholder": "Drop a screenshot of the repository picker (after GitHub auth)",
              "caption": "After authorizing Cloudflare on GitHub — the dropdown listing your repos. If your repo doesn't show up, you missed authorizing it — go back to GitHub settings → Applications → Cloudflare and toggle the repo on."
            }
          },
          {
            "type": "prose",
            "md": "## Pick your repo\n\nBack at Cloudflare, a list of your GitHub repositories appears. Find the one from Module 2. Click it. Click **Begin setup**.\n\nA configuration page loads with fields like *Project name*, *Production branch*, *Build settings*. **Most of these are auto-filled correctly.** Project name defaults to your repo name — keep it. Production branch is `main` — keep it. Build settings depend on what your prototype is built with — Cloudflare usually detects this; if you're not sure, leave them blank and click **Save and Deploy.**\n\nIf it fails because of build settings, you'll fix that in Lesson 3. **For now: trust the defaults.**"
          }
        ]
      },
      {
        "num": 3,
        "title": "Watch your first deploy succeed",
        "time": "~5 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Watch the first deploy\n\nAfter you clicked **Save and Deploy**, Cloudflare shows you a page with a progress indicator — *Initializing... Cloning... Building... Deploying...* It takes 1-2 minutes. **Don't refresh the page; don't close the tab.**\n\nIf it succeeds, you'll see a green banner and your URL: something like `your-project.pages.dev`. Click it. Your prototype loads.\n\n**That's your idea, live on the internet.** Anyone with that URL can see it now."
          },
          {
            "type": "prose",
            "md": "> **Don't guess. Capture.**\n>\n> If something goes wrong — a deploy fails, a button isn't where the lesson said it would be, an error you don't recognize shows up — **you do not need to understand any of it.** You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.\n>\n> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what is this error?\"* — Chat will tell you exactly what to fix and exactly what prompt to send Claude Code (or which field to change in GitHub / Render / Cloudflare).\n>\n> I have not hit a single obstacle that this loop didn't solve. **Use it every time.**"
          },
          {
            "type": "widget",
            "kind": "Screenshot",
            "props": {
              "slotId": "cf-deploy-success",
              "placeholder": "Drop a screenshot of a successful Cloudflare deploy",
              "caption": "The Deployments tab on Cloudflare with a green \"Success\" status and your .pages.dev URL. What \"the deploy worked\" actually looks like."
            }
          },
          {
            "type": "prose",
            "md": "## When it doesn't succeed first try\n\nMaybe it failed. Common reasons: wrong build command, missing dependency, broken file path. If you see a red banner, click into the deploy and look at the build logs. **Screenshot whatever the red text says.** Paste it into Claude Chat. Type *\"my Cloudflare deploy failed, here's the log.\"* Chat will tell you the fix.\n\nCommon fixes:\n- *Build command should be empty* — for a static HTML prototype, no build command is needed.\n- *Build output directory* — usually `.` (a single dot) or `dist` depending on the project.\n- *Missing Node version* — set the `NODE_VERSION` environment variable to `20` in Cloudflare → Settings.\n\nTry the fix. Re-deploy. **Three to five attempts is normal for the first deploy.** After that, it just works."
          },
          {
            "type": "prose",
            "md": "## What this URL is\n\nThe `.pages.dev` URL is permanent and free. It's not pretty — *project-name.pages.dev* — but it works. People can use it. You can share it. **It's a real website.**\n\nLater, when the project is ready for a real audience, you can connect a custom domain (`yourproduct.com`) in two clicks from the Cloudflare dashboard. That's not Module 4's job. Module 4 is about getting *something* live. **You did.**"
          }
        ]
      },
      {
        "num": 4,
        "title": "What \"auto-deploy from main\" means in practice",
        "time": "~6 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Auto-deploy\n\nFrom this moment forward, every time you push code to your GitHub repo's `main` branch, Cloudflare automatically rebuilds your site and replaces what's at your `.pages.dev` URL. **You will never manually deploy again.**\n\nThe loop becomes: write a change in Claude Code → push to GitHub → Cloudflare deploys it → 60-90 seconds later, the live URL has your change. You watch it happen in the browser."
          },
          {
            "type": "prose",
            "md": "## What 'push to main' means in practice\n\nIn Claude Code, after you make changes, you tell it:\n\n> *\"Commit these changes and push to main.\"*\n\nClaude Code runs the git commands. The push goes to GitHub. GitHub notifies Cloudflare. Cloudflare rebuilds. **The chain runs without you touching it.**\n\nYou can watch it: open the Cloudflare Pages dashboard → Deployments tab. Refresh after a push. You'll see a new deploy appear, progress through *Building → Deploying → Success* in real time."
          },
          {
            "type": "prose",
            "md": "## Why this matters\n\nThis is the moment the work becomes *shippable.* Every fix is a deploy. Every feature is a deploy. **There's no \"now I have to release\" step** — release is automatic.\n\nWhich means scope per session matters even more. Anything you ship to `main` goes to your live URL within a minute. Reviewing diffs before pushing — the habit from Module 3 — is no longer just a discipline. **It's a brake on what your users see.**\n\nLesson 5 is what to do when a deploy goes wrong."
          }
        ]
      },
      {
        "num": 5,
        "title": "Your first post-deploy bug — and how to fix it without panicking",
        "time": "~10 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Failed deploys are normal\n\nThree out of every twenty deploys will fail. Sometimes it's a typo. Sometimes a dependency moved. Sometimes Cloudflare's build environment had a hiccup. **None of this is a crisis.** It just is.\n\nThe failure pattern is always the same: you push, you watch the Cloudflare Deployments tab, the new deploy turns red instead of green, and your live URL — the one users see — still shows the *previous successful version*. That's the only piece of good news that matters. **A failed deploy doesn't break your live site.** It just doesn't update it."
          },
          {
            "type": "prose",
            "md": "> **Don't guess. Capture.**\n>\n> If something goes wrong — a deploy fails, a button isn't where the lesson said it would be, an error you don't recognize shows up — **you do not need to understand any of it.** You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.\n>\n> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what is this error?\"* — Chat will tell you exactly what to fix and exactly what prompt to send Claude Code (or which field to change in GitHub / Render / Cloudflare).\n>\n> I have not hit a single obstacle that this loop didn't solve. **Use it every time.**"
          },
          {
            "type": "prose",
            "md": "## The fix loop\n\nWhen a deploy fails, the loop is mechanical:\n\n1. Click into the failed deploy in Cloudflare. Find the build log.\n2. Scroll to the bottom. The error is usually in the last 30 lines, often in red.\n3. **Screenshot the bottom of the log.**\n4. Open Claude Chat. Drag the screenshot in. Type *\"my Cloudflare deploy just failed. Here's the bottom of the log.\"*\n5. Chat reads the screenshot and tells you what to fix.\n6. Open Claude Code. Tell it the fix. Push.\n7. Watch the next deploy.\n\n**That's the entire loop, every time.** You don't need to read the log yourself. You just have to capture it and ask."
          },
          {
            "type": "widget",
            "kind": "Screenshot",
            "props": {
              "slotId": "cf-failed-deploy",
              "placeholder": "Drop a screenshot of a typical failed Cloudflare build log",
              "caption": "A failed deploy with build logs visible. This is what learners screenshot and paste into Chat for the fix."
            }
          },
          {
            "type": "prose",
            "md": "## What you don't do\n\nDon't panic. Don't Google the error. Don't open a Stack Overflow tab. Don't switch tools. **The capture-and-ask loop is faster than any of those.**\n\nDon't \"just try a few things\" in Claude Code without going through Chat. That's a Module 3 anti-pattern. Even when the fix is obvious, the discipline of capture → Chat → precise prompt → Code keeps your sessions clean."
          },
          {
            "type": "prose",
            "md": "## When the third attempt fails\n\nIf the same kind of failure happens three times in a row, the prompt to Chat changes:\n\n> *\"I've tried to deploy three times and each time it fails with a different error. Here's the log from the latest attempt. I think I'm missing something fundamental.\"*\n\nChat will switch gears — instead of patching the latest error, it'll back up and look at the whole setup. **Sometimes the issue is two layers above where you're looking.** The conversation pulls back, and the next deploy succeeds."
          }
        ]
      }
    ]
  },
  "5": {
    "title": "Make your app real with a backend and database",
    "description": "Deploy a backend and connect a Postgres database. Your app stores and retrieves real data.",
    "deliverable": "A working backend deployed to Render, a Postgres database connected to it, and the frontend talking to the backend. The app stores and retrieves real data.",
    "lessons": [
      {
        "num": 1,
        "title": "When does your app need a backend?",
        "time": "~6 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## The signal you need a backend\n\nUp through Module 4, your app has been *frontend only* — HTML, CSS, JavaScript, running in someone's browser. That works for a lot of ideas. A calculator, a chart viewer, a tool that takes input and shows output — none of those need a backend.\n\n**The moment your app needs to remember anything between visits, you need a backend.** Users coming back to find their data still there. Anything that survives a browser refresh. Anything that gets saved.\n\nIf your idea has none of that, you can skip Module 5. Plenty of useful prototypes ship without backends."
          },
          {
            "type": "prose",
            "md": "## What a backend actually is\n\nA second piece of software, running on a different computer than the user's browser, that *holds the state* — the database, the user accounts, the saved files. The frontend in the browser calls the backend over the internet whenever it needs to read or write something.\n\nThink of it like a restaurant: **the frontend is the dining room**, what the customer sees. **The backend is the kitchen** — they never go in there, but everything they eat comes from it. The database is the pantry inside the kitchen.\n\nIn this course, the kitchen is a service called Render, and the pantry is a database called Postgres. Both are free at the scale we're using."
          },
          {
            "type": "prose",
            "md": "## The shape of what's coming\n\nBy the end of this module, you'll have:\n\n- A Render account, free tier, with a backend service deployed\n- A Postgres database also on Render, connected to that backend\n- An environment variable (`DATABASE_URL`) holding the connection string\n- Your Cloudflare frontend pointed at the new backend\n- An app that remembers things\n\nThis is the most technical module in the course. **It's also the one where the capture-and-ask habit pays back the most.** Expect three to five failed deploys. That's the rhythm here. Don't take it personally."
          }
        ]
      },
      {
        "num": 2,
        "title": "Make a Render account and deploy your backend",
        "time": "~10 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Make a Render account\n\nGo to **render.com** and click **Get Started**. Sign up with GitHub — \"Sign up with GitHub\" is the fastest path because you'll be connecting Render to your repo in the next step anyway.\n\nWhen you authorize Render on GitHub, give it permission to access *the repo from Module 2*. \"Only select repositories\" is fine. Click Authorize. **You bounce back to Render's dashboard.**"
          },
          {
            "type": "prose",
            "md": "> **Don't guess. Capture.**\n>\n> If something goes wrong — a deploy fails, a button isn't where the lesson said it would be, an error you don't recognize shows up — **you do not need to understand any of it.** You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.\n>\n> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what is this error?\"* — Chat will tell you exactly what to fix and exactly what prompt to send Claude Code (or which field to change in GitHub / Render / Cloudflare).\n>\n> I have not hit a single obstacle that this loop didn't solve. **Use it every time.**"
          },
          {
            "type": "prose",
            "md": "## Create a Web Service\n\nThe Render dashboard has a **+ New** button in the top-right. Click it. A dropdown shows the things Render can host. Pick **Web Service.**\n\nA two-step wizard opens.\n\n**Step 1 — Source:** Render shows you the GitHub repos it can see. Find yours. Click **Connect**."
          },
          {
            "type": "widget",
            "kind": "Screenshot",
            "props": {
              "slotId": "render-new-service",
              "placeholder": "Drop a screenshot of Render → New → Web Service",
              "caption": "Render dashboard → \"+ New\" → \"Web Service\" → repo picker. The starting point for any backend deploy."
            }
          },
          {
            "type": "prose",
            "md": "## Configure the service\n\n**Step 2 — Configuration:** this page has a lot of fields. Most should be left at their defaults. Here's what each one means:\n\n- **Name** — what shows up in URLs. Pick something short and lowercase. *yourname-backend* works.\n- **Region** — pick the one closest to where your users live. *Oregon (US West)* or *Ohio (US East)* are the defaults.\n- **Branch** — `main`. Leave it.\n- **Root Directory** — leave empty unless your backend is in a subfolder.\n- **Runtime** — Render auto-detects this from your code. Leave it.\n- **Build Command** — usually `npm install` for Node projects. Render usually auto-fills.\n- **Start Command** — usually `npm start`. Auto-filled.\n- **Instance Type** — pick **Free**. Always free for learning.\n\nScroll to the bottom. Click **Create Web Service.**"
          },
          {
            "type": "widget",
            "kind": "Screenshot",
            "props": {
              "slotId": "render-service-config",
              "placeholder": "Drop a screenshot of the Web Service config page",
              "caption": "The page where you set Name, Region, Branch, Build Command, Start Command. Annotate the defaults that should not be changed and the ones that should."
            }
          },
          {
            "type": "prose",
            "md": "## Wait for the first deploy\n\nRender starts building your backend. The page that loads shows a log scrolling — cloning the repo, installing dependencies, starting the service. **Three to five minutes is normal.**\n\nA few likely outcomes:\n\n- **It succeeds.** You see a green *Live* badge and a URL ending in `.onrender.com`. Move to Lesson 3.\n- **It fails immediately.** Probably missing a dependency or a wrong start command. Screenshot the bottom of the log. Bring it to Chat. Fix. Re-deploy.\n- **It builds but won't start.** Usually a port binding issue — the backend needs to listen on the port Render assigns via the `PORT` environment variable. Chat will tell you the one-line fix.\n\n**The first deploy almost never succeeds first try.** That's the entire purpose of Lesson 4."
          }
        ]
      },
      {
        "num": 3,
        "title": "Add a Postgres database and connect it to your backend",
        "time": "~8 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## What Postgres is\n\nPostgres (sometimes \"PostgreSQL\") is a database. It holds rows of data — users, posts, anything — and your backend reads from it and writes to it.\n\nIt's the industry-standard free database. **You don't need to know SQL or how databases work internally.** You need to know how to spin one up on Render and how to connect your backend to it. That's this lesson."
          },
          {
            "type": "prose",
            "md": "> **Don't guess. Capture.**\n>\n> If something goes wrong — a deploy fails, a button isn't where the lesson said it would be, an error you don't recognize shows up — **you do not need to understand any of it.** You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.\n>\n> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what is this error?\"* — Chat will tell you exactly what to fix and exactly what prompt to send Claude Code (or which field to change in GitHub / Render / Cloudflare).\n>\n> I have not hit a single obstacle that this loop didn't solve. **Use it every time.**"
          },
          {
            "type": "prose",
            "md": "## Spin up the database\n\nBack on the Render dashboard, click **+ New** again. This time pick **Postgres** from the dropdown.\n\nA form opens. Fields:\n\n- **Name** — *yourname-db* or similar.\n- **Region** — **the same region you picked for your backend in Lesson 2.** This matters for speed.\n- **Database** — leave default.\n- **User** — leave default.\n- **Instance Type** — Free.\n\nClick **Create Database.** Render provisions it — takes 1-2 minutes. **When you see a green *Available* badge, it's live.**"
          },
          {
            "type": "widget",
            "kind": "Screenshot",
            "props": {
              "slotId": "render-new-postgres",
              "placeholder": "Drop a screenshot of Render → New → Postgres",
              "caption": "Render → \"+ New\" → \"Postgres\". The form for spinning up the free-tier database."
            }
          },
          {
            "type": "prose",
            "md": "## Find the connection string\n\nOn the database's page, scroll down until you see a section called **Connections.** Inside there's a field called **Internal Database URL** — something starting with `postgresql://`.\n\n**Copy the entire value.** This is your `DATABASE_URL` — the secret your backend needs to know to talk to the database.\n\nUse the Internal URL, not the External one. Internal means \"only services inside Render can use this\" — which is what you want. Faster and safer."
          },
          {
            "type": "widget",
            "kind": "Screenshot",
            "props": {
              "slotId": "render-database-url",
              "placeholder": "Drop a screenshot of the Connection details / Internal DATABASE_URL",
              "caption": "After Postgres provisions — the page showing \"Internal Database URL.\" This is the value learners copy into their backend service's env vars as DATABASE_URL."
            }
          },
          {
            "type": "prose",
            "md": "## Plug the connection into the backend\n\nGo back to your Web Service from Lesson 2. Click **Environment** in the left sidebar.\n\nYou'll see a list of environment variables (probably empty). Click **Add Environment Variable.**\n\n- **Key:** `DATABASE_URL`\n- **Value:** paste the Internal Database URL you copied.\n\nClick **Save Changes.** Render restarts your backend automatically — it has to, because the backend needs to read the new env var when it starts. **Watch the logs for the new deploy.**\n\nIf your backend code already knows to look for `DATABASE_URL` (most do), it'll just connect on startup. If it doesn't, you need a Chat conversation about adding the connection logic — paste your backend's start file and ask *\"how do I make this connect to a Postgres database at the URL in DATABASE_URL?\"*"
          },
          {
            "type": "widget",
            "kind": "Screenshot",
            "props": {
              "slotId": "render-env-vars",
              "placeholder": "Drop a screenshot of the Web Service → Environment tab",
              "caption": "The Environment tab on the backend service with DATABASE_URL pasted in. The hand-off between database and backend."
            }
          }
        ]
      },
      {
        "num": 4,
        "title": "Why your first backend deploy will probably fail — and that's normal",
        "time": "~10 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Backend deploys are harder\n\nThe Cloudflare deploys in Module 4 succeeded most of the time. Backend deploys on Render are different — **plan for the third or fourth attempt to be the one that works.**\n\nHere's why. A frontend deploy has one job: serve some HTML files. A backend deploy has to:\n\n- Install all dependencies\n- Connect to the database (with the right URL, the right credentials, the right region)\n- Listen on the right port\n- Handle the right environment variables\n- Start without crashing\n\nAny one of those failing breaks the deploy. **You'll see all five kinds of failure at some point.**"
          },
          {
            "type": "prose",
            "md": "> **Don't guess. Capture.**\n>\n> If something goes wrong — a deploy fails, a button isn't where the lesson said it would be, an error you don't recognize shows up — **you do not need to understand any of it.** You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.\n>\n> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what is this error?\"* — Chat will tell you exactly what to fix and exactly what prompt to send Claude Code (or which field to change in GitHub / Render / Cloudflare).\n>\n> I have not hit a single obstacle that this loop didn't solve. **Use it every time.**"
          },
          {
            "type": "prose",
            "md": "## The common ones\n\nThe four failures that happen most:\n\n1. **\"Cannot find module ...\"** — a dependency is missing from `package.json`. Tell Chat which module is missing and it'll patch the file.\n2. **\"Connection refused / could not connect to database\"** — the `DATABASE_URL` env var isn't set or has a typo. Re-check the Environment tab.\n3. **\"Application failed to listen on port ...\"** — the backend isn't reading the `PORT` env var Render provides. One-line fix in your server start file.\n4. **\"Permission denied\" / \"Out of memory\"** — Render free tier has limits. Usually a code fix, not a Render fix. Send the log to Chat.\n\n**Every one of these has a one-line fix.** The fix loop is the same as Module 4: screenshot the bottom of the Render log, paste into Chat, follow the instruction, redeploy."
          },
          {
            "type": "widget",
            "kind": "Screenshot",
            "props": {
              "slotId": "render-build-logs",
              "placeholder": "Drop a screenshot of Render build logs (any deploy)",
              "caption": "The Logs tab. When a deploy fails, this is what learners screenshot and paste into Chat."
            }
          },
          {
            "type": "prose",
            "md": "## Don't switch tools\n\nThe temptation when backend deploys fail repeatedly is to *try a different host* — \"maybe Vercel is easier, maybe Railway works.\"\n\nIt isn't. They have the same problems. **Switching tools mid-debug doubles your work and resets your context.** The fix you need is probably one prompt away in Chat. Stay on Render. Push through.\n\nA backend that deploys cleanly on Render will deploy cleanly anywhere later. **Do the work once and you have it forever.**"
          }
        ]
      },
      {
        "num": 5,
        "title": "Connect the frontend to the backend, and watch real data flow",
        "time": "~10 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## The last wire\n\nFrontend deployed on Cloudflare. Backend deployed on Render. Database connected to the backend. **One wire left:** tell the frontend where to find the backend.\n\nRight now, your frontend doesn't know the backend exists. It has no URL to call. Lesson 5 is the moment you connect them, and it's a single environment variable on Cloudflare."
          },
          {
            "type": "prose",
            "md": "> **Don't guess. Capture.**\n>\n> If something goes wrong — a deploy fails, a button isn't where the lesson said it would be, an error you don't recognize shows up — **you do not need to understand any of it.** You don't need to know what the error means. You don't need to guess if you're in the right place. You don't need to Google.\n>\n> Take a screenshot of whatever is on your screen. Drag it into Claude Chat. Type one line: *\"is this right?\"* or *\"what is this error?\"* — Chat will tell you exactly what to fix and exactly what prompt to send Claude Code (or which field to change in GitHub / Render / Cloudflare).\n>\n> I have not hit a single obstacle that this loop didn't solve. **Use it every time.**"
          },
          {
            "type": "prose",
            "md": "## Find your Render URL\n\nGo back to Render, open your Web Service, and find the URL at the top of the page — `your-service-name.onrender.com`. Copy it.\n\nIf you're not sure which URL is which: backend = ends in `.onrender.com`, frontend = ends in `.pages.dev`. You want the `.onrender.com` one here."
          },
          {
            "type": "prose",
            "md": "## Add the env var to Cloudflare\n\nGo to **Cloudflare → Workers & Pages → your project → Settings → Environment variables.**\n\nClick **Add variable.** The key depends on what your frontend code is looking for — common ones are `VITE_API_URL`, `REACT_APP_API_URL`, or `NEXT_PUBLIC_API_URL`. **If you're not sure which:** open Claude Chat, paste your frontend's API-calling code, and ask *\"what environment variable does this code expect for the API URL?\"* Chat tells you.\n\nValue: paste your Render URL (the `.onrender.com` one).\n\nClick **Save.**"
          },
          {
            "type": "prose",
            "md": "## Trigger a redeploy\n\nCloudflare won't pick up the new env var until the next deploy. You can either wait for your next push or trigger one manually: **Pages → your project → Deployments tab → Retry deployment** on the most recent build.\n\n60-90 seconds later, your frontend at `.pages.dev` is talking to your backend at `.onrender.com`.\n\nGo to your `.pages.dev` URL. Trigger whatever action your app does that should save data. Refresh the page. **The data should still be there.** That's the moment the app is real."
          },
          {
            "type": "prose",
            "md": "## What you've built\n\nA frontend on Cloudflare. A backend on Render. A Postgres database. All of it talking, all of it deployed, all of it free for the scale you're at.\n\nThis is the same shape as every production web app shipped this year. **There is nothing more to add until you decide what to add.** Module 6 is the discipline that keeps it all running cleanly as you do."
          }
        ]
      }
    ]
  },
  "6": {
    "title": "Keep building without breaking what works",
    "description": "The discipline that keeps your app shipping cleanly forever: precise prompts, diff review, receipts not summaries, CLAUDE.md updates.",
    "deliverable": "Your first post-launch feature, shipped end-to-end using the full discipline — Chat-written prompt, scoped Code session, draft pull request, diff review, smoke test, CLAUDE.md update.",
    "lessons": [
      {
        "num": 1,
        "title": "The shape of every prompt you'll ever send to Code",
        "time": "~8 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Three parts\n\nA precise prompt for Claude Code has three parts, always in the same order:\n\n1. **What you want — one sentence.** *\"Add a logout button to the top-right of every page.\"*\n2. **The specifics — files, behaviors, what to leave alone.** *\"In `apps/web/src/components/Nav.tsx`, add a Logout button that calls `useAuth().logout()`. Don't touch any other component.\"*\n3. **The footer.** *\"Show me the diff before applying. Do not merge. Leave as a draft PR.\"*\n\n**The whole prompt is usually four to six sentences.** Not a paragraph. Not a list of requirements. A clear, scoped instruction."
          },
          {
            "type": "prose",
            "md": "## Why this shape works\n\nThe first sentence anchors. Without it, Claude reads the rest hunting for what you actually want. With it, the rest fills in the detail.\n\nThe middle is the protection. Naming what to *leave alone* is the most underrated move in the whole workflow. **Code is permissive by default.** It'll happily refactor an adjacent file you weren't thinking about. The \"don't touch X\" line is what stops that.\n\nThe footer makes the diff reviewable. *Show me the diff. Don't merge.* These five words save more time than any other habit in this course. **You write them at the end of every prompt, forever.**"
          },
          {
            "type": "prose",
            "md": "## Build the template\n\nKeep a saved prompt template — in a note, a sticky, a Claude Chat conversation, anywhere. Mine looks like:\n\n> *\"<one-sentence ask>.*\n>\n> *In `<file path>`, <specific change>. <what not to touch>.*\n>\n> *Show me the diff before applying. Do not merge. Leave as draft.\"*\n\nFill it in for each task. **Same shape every time.** The repetition is the point — your eyes learn to scan for the four parts and you can tell at a glance whether a prompt is ready to send or still needs work."
          }
        ]
      },
      {
        "num": 2,
        "title": "\"Show me the diff before applying\" — the single most important habit",
        "time": "~7 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## What a diff is\n\nA *diff* is the list of changes Claude Code is about to apply. Files added in green. Lines added in green. Lines removed in red. Files renamed, moved, deleted — all shown.\n\nClaude Code shows you the diff when you ask for it. Some interfaces show it automatically; some require you to type *\"show me the diff before applying.\"* That's why the footer in Lesson 1 always ends with that line. **The diff is the moment you catch problems.**"
          },
          {
            "type": "prose",
            "md": "## What to look for\n\nFive things, every time:\n\n1. **The files changed.** Are they only the ones you asked about? If there's an extra file, that's scope creep.\n2. **The line count.** A two-line ask should produce a two-line diff. A two-line ask producing a 40-line diff is a flag.\n3. **The new code.** Does it look like what you asked for? Skim it. You don't have to understand every word.\n4. **The deleted code.** Anything important being removed? Is the removal what you wanted?\n5. **Side effects.** Imports added or removed. Configuration touched. Build files modified. These are the usual culprits when something breaks after a merge.\n\n**Five seconds per file, every time.** That's the whole discipline."
          },
          {
            "type": "prose",
            "md": "## When to reject\n\nIf the diff is wrong — wrong scope, wrong approach, wrong files — reject it. Tell Claude Code *\"reject — instead, just <correct ask>.\"* The session continues, the rejected diff is gone.\n\nIf the diff is *partially* right — the change is correct but it also touched something it shouldn't — you can accept it and patch separately, or reject and re-prompt with tighter scope. **Re-prompting is usually faster.** A second prompt with the lesson learned is cleaner than untangling the first.\n\nThe muscle to build: **rejecting is free.** It feels like throwing work away. It isn't — the work was wrong, and accepting it would cost more to unsnarl later."
          }
        ]
      },
      {
        "num": 3,
        "title": "Receipts, not summaries — verifying what actually happened",
        "time": "~8 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Summaries lie quietly\n\nWhen Claude Code finishes a task, it often tells you what it did. *\"I've updated the auth flow. The login endpoint now returns 429 on rate-limit, and I added a corresponding test.\"*\n\n**That summary is a summary, not a receipt.** It says what Claude *meant* to do. It doesn't prove what actually happened. Most of the time the two match. Sometimes they don't — the change is partial, the test wasn't actually added, the file path is wrong.\n\nSummaries drift. Receipts don't lie."
          },
          {
            "type": "prose",
            "md": "## What a receipt looks like\n\nA receipt is the actual output of something that happened. The list of files changed in the git status. The output of the test that just ran. The HTTP response from the live endpoint. The screenshot of the page in a browser.\n\nWhen something matters, ask for the receipt instead of the summary:\n\n> *\"Show me the actual output of `npm test` after that change.\"*\n>\n> *\"Run a curl request against the new endpoint and show me the full response, including status and headers.\"*\n>\n> *\"Show me `git diff HEAD~1` — I want to see exactly what got committed.\"*\n\n**The receipt either confirms the summary or contradicts it.** Either way, you know where you stand."
          },
          {
            "type": "prose",
            "md": "## When to bother\n\nNot every change needs a receipt. Most don't. The discipline is *knowing which ones do.*\n\n- Anything that touches auth, payment, or user data: receipt.\n- Anything that changes deployment: receipt.\n- Anything that's failed once before in this code: receipt.\n- Anything that you'll have a hard time rolling back: receipt.\n- Small UI changes that you'll see in the browser anyway: summary is fine.\n\nThe rule of thumb: **if a wrong summary would cost you an hour, ask for the receipt.** If it'd cost you ten seconds, save the breath."
          }
        ]
      },
      {
        "num": 4,
        "title": "Keep your CLAUDE.md current — drift is how projects get confused",
        "time": "~6 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Drift is the enemy\n\nYou wrote a CLAUDE.md in Module 3. You committed it to your repo. Every Claude Code session reads it at the start.\n\nIf the file says one thing and the code says another, future sessions get contradictory advice. Code reads *\"the database is on Postgres\"* and *\"we use Mongo\"* and has to guess. **Sometimes it guesses wrong.**\n\nThis is drift. The longer you build, the more drift accumulates. The CLAUDE.md decays in trust value. The sessions get more confused. **The whole project memory pattern breaks.**"
          },
          {
            "type": "prose",
            "md": "## The fix is a small habit\n\nAt the end of every feature you ship, the last Chat conversation isn't *\"what's next?\"* It's:\n\n> *\"Propose the CLAUDE.md update for what we just did.\"*\n\nChat reads what's currently in CLAUDE.md (you can paste it or it can read from your repo), looks at what changed in the last few commits, and proposes the patch. You glance at the patch — most of the time it's right — and tell Claude Code to apply it.\n\nThe whole habit is **two minutes per feature.** Worth it."
          },
          {
            "type": "prose",
            "md": "## When to update vs not\n\nNot every change needs a CLAUDE.md update. Don't bloat the file. The rule:\n\n- **New layer added** (database, auth, payment provider) → update.\n- **New section of the app** (a new page, a new admin panel) → update.\n- **A *decision* changed** (we used to use X, now we use Y) → update.\n- **A *fact* changed** (the project moved from Render to Vercel) → update.\n- **Bug fix that doesn't change architecture** → no update.\n- **Copy edits, color tweaks, layout fixes** → no update.\n\nThe test: **would a Claude Code session a month from now get confused without this update?** If yes, update. If no, skip."
          }
        ]
      },
      {
        "num": 5,
        "title": "When you're stuck, keep going — the breakthrough is on the other side",
        "time": "~10 min",
        "blocks": [
          {
            "type": "prose",
            "md": "## Every builder hits the wall\n\nThere will be a point in this project — there's already been one, maybe — where nothing works. Three deploys in a row failed. The latest feature broke two previous ones. Chat keeps suggesting things you've already tried. **Nothing makes sense.**\n\nThis happens. To everyone. It's not a sign you're bad at this, and it's not a sign your project is broken. It's just the bottom of a particular dip, and the way through is the same for everybody."
          },
          {
            "type": "prose",
            "md": "## What to do\n\nSlow down. Don't give up.\n\nTake a break. Get up. Walk somewhere. **Don't open another tab to Google your problem.** Don't try a fifth fix that's basically the same as the first four. The brain needs to leave the chair for a few minutes.\n\nCome back. Read the errors again — the actual text, not your memory of them. Walk through what you know. Often, the thing you missed is one line up from where you've been looking. **The breakthrough usually comes within an hour of the worst stuck moment.**\n\nIt's earned by staying in the chair five minutes longer than feels reasonable. Not by trying harder while stuck. By stopping, breathing, returning."
          },
          {
            "type": "prose",
            "md": "## What you'll know that nobody told you\n\nIf you ship this project — and you can — you'll have done something that *most people who've thought about building software never do.* You'll know exactly how brittle the production stack is. You'll know exactly which parts of Claude's output to trust and which to verify. You'll know exactly how the chat-and-code split works in your hands.\n\n**That knowledge is the actual product of this course.** The deployed app is the proof. Everything you build after this one is faster because of what you learned here.\n\nThere isn't another module after this. The course ends when you ship. **Go ship.**"
          }
        ]
      }
    ]
  }
};
