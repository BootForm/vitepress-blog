---
layout: page
title: Contact
---

<!-- ───── The form ─────
     Replace __YOUR_FORM_ID__ below with the ID you generate in step 3 of the README. Everything
     else here already works. -->

<div class="mx-auto max-w-md px-6 py-16">

<h1 class="mb-6 text-3xl font-bold tracking-tight">Get in touch</h1>

<form action="https://f.bootform.com/__YOUR_FORM_ID__" method="POST" class="flex flex-col gap-4">

  <div class="flex flex-col gap-1">
    <label for="name" class="text-sm font-medium">Your name</label>
    <input id="name" name="name" type="text" required
           class="rounded-md border border-black/15 px-3 py-2 outline-none focus:border-brand-500 dark:border-white/15">
  </div>

  <div class="flex flex-col gap-1">
    <label for="email" class="text-sm font-medium">Your email</label>
    <input id="email" name="email" type="email" required
           class="rounded-md border border-black/15 px-3 py-2 outline-none focus:border-brand-500 dark:border-white/15">
  </div>

  <div class="flex flex-col gap-1">
    <label for="message" class="text-sm font-medium">What do you need done?</label>
    <textarea id="message" name="message" rows="4" required
              class="rounded-md border border-black/15 px-3 py-2 outline-none focus:border-brand-500 dark:border-white/15"></textarea>
  </div>

  <!-- A spam trap. Real people never see it, bots fill it in. Leave it alone. -->
  <input type="text" name="_honeypot" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">

  <button type="submit" class="self-start rounded-md bg-brand-500 px-5 py-2 font-medium text-white hover:bg-brand-600">
    Send
  </button>
</form>

</div>
