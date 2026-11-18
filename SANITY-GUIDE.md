# Updating the Flintwell website

A guide to Sanity — the system you use to change what's on the site.

> **Your link: [flintwell-cms.sanity.studio](https://flintwell-cms.sanity.studio/)**
> Bookmark it. Ed will set you up with a login.

---

## The one-minute version

Your website has two halves. The **site** is what visitors see. **Sanity** is
the private back room where you type the words and drop in the photographs.

Everything you do in Sanity follows the same three steps:

1. **Find** the thing you want to change in the left-hand list
2. **Change** it
3. Press **Publish**

Nothing you type appears on the website until you press Publish. Which means
you can open anything, poke at it, and walk away without consequence.

---

## Four things that will save you

**Nothing is live until you press Publish.** Sanity saves your typing as you
go, but it saves it as a *draft*. Drafts are private. The website only ever
shows what you have published.

**You cannot lose anything.** Sanity keeps every version of everything,
forever. If you delete a paragraph you wanted, it is recoverable — see
*Undoing a mistake* at the end.

**If Publish will not press, something is missing.** Sanity will not let you
publish a project with no title, or an image with no description, because
those break the page. It tells you which field, in red. Fill it in and
Publish wakes up.

**Give it a minute.** After you publish, the website takes a few seconds to
catch up. If you do not see your change, wait a moment and refresh. Still
nothing? Hold **Shift** and click refresh — that forces your browser to stop
showing you its own saved copy.

---

## What is in the left-hand list

Six things, and here is where each one shows up:

| In Sanity | On the website |
|---|---|
| **Projects** | Every job. The homepage shows the first six; the Work page shows them all. |
| **Testimonials** | The "our friends" quotes on the pink panel. |
| **Homepage** | The big line at the very top of the site. |
| **About section** | The "about us + what we do" copy, and the square photograph beside it. |
| **Contact + enquiry email** | The contact page wording, *and* the automatic reply people get. |
| **Site details** | Your email, phone, Instagram and address — in the footer and the menu. |

The first two are **lists** you add to. The last four are **single pages** —
there is only ever one of each, so you just open it and edit it. You cannot
accidentally end up with two homepages.

---

## Adding a new project

The one you will do most. About five minutes.

1. Click **Projects**, then the **+** at the top of the list.
2. **Title** — the project name, e.g. *The Long Barn*.
3. **Project Number** — the job number, digits only: `24`. The site turns
   that into `PROJECT24 | The Long Barn`. Leave it blank to show just the name.
4. **Slug** — this is the project's web address. Press **Generate** and it
   makes one from the title. That is all you need to do.
5. **Display Order** — see *Changing the running order* below. Give it a
   number now, even if you change it later.
6. **Main image** — the lead photograph. Click to upload. Then two things:
   - Write **Alt text**: what the photo shows, in a few words. *"Pale grey
     pantry cupboard open beneath an exposed oak beam"* — not *"kitchen
     photo"*. This is what a blind visitor hears, and what Google reads to
     understand the picture.
   - Click the **crop icon** and drag the circle onto whatever must stay in
     frame. This photo gets used as a tall card *and* a wide banner, and the
     circle is how the site knows what not to cut off.
7. **Year** and **Location** — *2025*, *Sussex*. Town or area, not the full
   address.
8. **Gallery** — the rest of the photographs. Upload as many as you like, drag
   to reorder. **Each one needs alt text too.**
9. **Description** — the project write-up. Press Enter for a new paragraph.
   Plain paragraphs read best; you do not need the headings and lists.
10. **Tagline** — one line, e.g. *"A Victorian semi opened up to the garden"*.
    You will not see this on the page. It is what appears under the link in
    Google results, and when someone shares the project on WhatsApp. Worth
    writing.
11. Press **Publish**.

---

## Changing the running order

Every project has a **Display Order** number. Low numbers come first.

The project with **1** leads the homepage. The homepage shows the **first
six**; the Work page shows everything.

So to move a project to the front, give it `1`, and give the one that was
there `2`. Leave a project's order blank and it drops to the very end.

Testimonials work the same way — the quote with the lowest number is the one
people see first.

> **Tip:** number them `10, 20, 30, 40` rather than `1, 2, 3, 4`. Then
> slipping something into the middle is just `15`, with nothing else to
> renumber.

---

## Taking a project off the site

Open it, press the **⋮** menu at the top right, then **Unpublish**. The
project disappears from the website but stays in Sanity, photographs and all,
so you can put it back later by pressing Publish again.

Use **Delete** only when you want it gone for good.

---

## Changing the words on the homepage

- **The big line at the top** — *Homepage* → *Hero statement*. One field;
  that is the whole document.
- **The "about us + what we do" bit** — *About section*. The heading, the
  copy, and the square photograph beside it.
- **The contact page wording** — *Contact + enquiry email*, top three fields.

**For a new paragraph, leave a completely blank line between paragraphs.**
One Enter is not enough — press it twice. This applies to the About copy and
the contact intro.

---

## Adding a testimonial

**Testimonials** → **+**

- **Quote** — the words only. The site adds the quote marks around them, so
  do not type your own or you get two sets. No need for the name here either.
- **Author Name** — who said it.
- **Role** — *Client*, *Developer*, *Interior Designer*.
- **Display Order** — lowest shows first.

Keep quotes under about 40 words or they get cramped on a phone. Sanity warns
you if one is long — a warning is only advice, you can still publish.

---

## Your contact details

**Site details.** Changing your email or phone here changes it everywhere on
the site at once, footer and menu, so there is only one place to do it.

**The Email field does something extra:** it is the address every enquiry from
the contact form is delivered to. Change it and the form follows. Worth
knowing, and worth not mistyping.

The **Registered Address** is one line per box, and shows in the menu.

---

## The automatic reply

When someone fills in your contact form, two emails go out: the enquiry to
you, and an automatic acknowledgement to them. You control what that
acknowledgement says.

**Contact + enquiry email** → the **Email Template** tab.

The pieces arrive in this order: Subject, then *"Dear [their name],"*, then
Greeting, Body, Closing, then your brochure link, then the sign-off.

Two of the boxes contain words in curly brackets. **Leave those exactly as
they are** — they get swapped for real details as the email sends:

- `{location}` becomes the place they typed into the form
- `{responseTime}` becomes whatever is in the **Response Time** box

So if Response Time says `48 hours`, the sentence *"You can expect a direct
response within {responseTime}"* arrives as *"…within 48 hours"*. Change that
box to `2 working days` and every future email says that instead.

**The brochure** is a PDF you upload on the main tab. The email links to it
automatically — so do not write "please find attached" anywhere in your copy.
To send a new brochure, upload the new PDF over the old one; everyone who
emails from then on gets the new one.

---

## Photographs — what works

- **Landscape or portrait both work.** The site crops to fit, and the crop
  tool lets you choose how.
- **Big is fine.** Straight off the camera is ideal — Sanity shrinks them for
  the website automatically. Do not resize them smaller first; you cannot add
  detail back.
- **Phone photos work.** They just will not look like the photographer's.
- **Always use the crop circle** if something must stay in shot. Drag it onto
  the thing that matters, not the middle of the picture.
- **Always write alt text.** Sanity will not let you publish without it. If an
  image is purely decorative and the words beside it already say everything,
  tick **Decorative** instead.

---

## Undoing a mistake

Open the document, press the **⋮** menu at the top right, then **History**.

You get every change ever made, with dates. Click one to see what it looked
like then, and restore it if you want it back. Nothing is ever really lost.

---

## When it is not working

**"I published but the website looks the same."**
Wait a few seconds and refresh. Then hold **Shift** and refresh. If it is
still wrong after a couple of minutes, that is one for Ed.

**"The Publish button is greyed out."**
A required field is empty — usually alt text on an image, or a missing title
or slug. Scroll up for the field marked in red.

**"My photo is cropped badly."**
Click the crop icon on the image and drag the circle onto what matters, then
publish again.

**"My paragraphs ran together."**
You need a completely blank line between them. Press Enter twice.

---

## Best left to Ed

- **The Slug of a project that is already live.** It is the page's address.
  Change it and every link anyone has shared — email, Instagram, Google —
  stops working.
- **Anything you cannot see on the site after publishing it.**
- **Adding a new kind of thing** — a new section, a new page, a new field.

Everything else is yours. You genuinely cannot break the site from in here.
The worst case is that something looks wrong for a few minutes until it is
changed back — and History means it can always be changed back.
