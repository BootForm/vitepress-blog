---
layout: page
title: Contact
---

<!-- ───── Small hero ─────
     CHANGE ME: your own heading and subtitle. The `!`-suffixed classes force the sizing,
     centering, and (further down) the form's borders/padding/colors past the unlayered element
     resets documented in AGENTS.md's CSS-layering note; without them this page quietly renders
     with no visible input borders, an invisible button, and a tiny unstyled heading, all at once,
     with no error anywhere. -->
<div class="bg-brand-500/10 px-6 py-16 text-center">
  <h1 class="text-3xl! font-bold! tracking-tight sm:text-4xl!">Let's talk about your yard</h1>
  <p class="mx-auto! mt-3 max-w-xl text-center opacity-70">
    Tell us what you're working with and what you'd like it to look like. We read every message
    ourselves and usually reply within a day.
  </p>
</div>

<!-- ───── The form ─────
     Replace __YOUR_FORM_ID__ below with the ID you generate in step 3 of the README. Everything
     else here already works. -->
<div class="mx-auto max-w-lg px-6 py-16">

<div class="rounded-xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8">

<form action="https://f.bootform.com/__YOUR_FORM_ID__" method="POST" class="flex flex-col gap-4">

  <div class="flex flex-col gap-1">
    <label for="name" class="text-sm font-medium">Your name</label>
    <input id="name" name="name" type="text" required
           class="rounded-md border! border-gray-300! bg-white! px-3! py-2! outline-none focus:border-brand-500! focus:ring-2 focus:ring-brand-500/25 dark:border-gray-600! dark:bg-white/5!">
  </div>

  <div class="flex flex-col gap-1">
    <label for="email" class="text-sm font-medium">Your email</label>
    <input id="email" name="email" type="email" required
           class="rounded-md border! border-gray-300! bg-white! px-3! py-2! outline-none focus:border-brand-500! focus:ring-2 focus:ring-brand-500/25 dark:border-gray-600! dark:bg-white/5!">
  </div>

  <div class="flex flex-col gap-1">
    <label for="message" class="text-sm font-medium">What do you need done?</label>
    <textarea id="message" name="message" rows="4" required
              class="rounded-md border! border-gray-300! bg-white! px-3! py-2! outline-none focus:border-brand-500! focus:ring-2 focus:ring-brand-500/25 dark:border-gray-600! dark:bg-white/5!"></textarea>
  </div>

  <!-- A spam trap. Real people never see it, bots fill it in. Leave it alone. -->
  <input type="text" name="_honeypot" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">

  <button type="submit" class="self-start rounded-md bg-brand-500! px-5! py-2! font-medium text-white! hover:bg-brand-600!">
    Send
  </button>
</form>

</div>

</div>
