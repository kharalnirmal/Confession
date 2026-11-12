# Accessibility regression checklist

This is a repeatable manual test plan, **not a statement of conformance or a record
of completed checks**. Record the commit, browser/OS, viewport, assistive technology,
steps, and results when running it. Log failures rather than marking them passed.

## Keyboard and focus

1. Reload and use only Tab, Shift+Tab, Enter, and Space. Both music choices should
   be reachable, visibly focused, and operable.
2. Follow the opening through the story. Check where focus lands after transitions;
   it must not be hidden, trapped, or left on a removed control.
3. Pause and resume with the keyboard. The accessible name should switch between
   “Pause story” and “Resume story”, and the pose should stop while paused.
4. At the ending, exercise both Yes/replay and No. Reach every social link and
   confirm its name identifies the destination and warns about a new tab.

## Reduced motion

Enable the OS/browser `prefers-reduced-motion` setting before loading. The full
draft should appear without character-by-character typing, with a manual
“There’s something more” continuation. Check that illustrated motion and the
constellation use their reduced-motion presentation. Also change the preference
while the page is open. Separately assess timed reveal/ending transitions: a
reduced-motion illustration alone is not proof that every transition is suitable.

## Reading and assistive technology

- With a screen reader, verify headings, the unsent-draft text, captions, controls,
  and ending make sense in order. Decorative SVGs should not add repeated noise.
- Ensure the draft is not announced one character at a time. Check whether timed
  chapter changes allow sufficient reading time; use pause/resume while testing.
- Test music failure (block the media request) and confirm the status text is
  discoverable while the visual story can continue.
- Check actual text/background contrast in both daytime and night scenes, including
  focus outlines and translucent text. Automated gradient results need manual review.

## Layout and media

- Test at 320px width, phone landscape, and 200% browser zoom. Look for clipped
  captions, obscured controls, and horizontal overflow.
- Choose silence and confirm no music begins. Hide/restore the tab during playback
  and confirm neither audio nor narrative skips unexpectedly.
- Block Google Fonts and check readable fallbacks. Test touch targets on a real
  phone, not just a desktop viewport emulation.

Automated accessibility scans can supplement these steps, but do not replace
keyboard, screen-reader, contrast, or real-device testing.
