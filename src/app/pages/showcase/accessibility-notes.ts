// Extracted from the @checkworkrights/ui-angular v1.0.32-dev.80eb5c1 bundle (templates, host
// bindings and key handlers), keyed by selector. Only behaviour the component itself implements
// belongs here. Unlike the API tables this is not regenerated, so re-check it when the library
// version in the sidebar changes.

export interface KeyboardNote {
  keys: string;
  action: string;
}

export interface AccessibilityNotes {
  keyboard: KeyboardNote[];
  aria: string[];
  notes: string[];
}

/** Library version these notes were checked against; the page flags a mismatch. */
export const ACCESSIBILITY_NOTES_VERSION = '1.0.32-dev.80eb5c1';

export const ACCESSIBILITY_NOTES: Record<string, AccessibilityNotes> = {
  "cwr-ag-grid": {
    "keyboard": [],
    "aria": [],
    "notes": [
      "This is a thin wrapper around ag-grid-angular and adds no keyboard or ARIA handling; all grid accessibility comes from AG Grid.",
      "defaultColDef turns on filter and sortable for every column."
    ]
  },
  "cwr-badge": {
    "keyboard": [],
    "aria": [],
    "notes": [
      "It renders the value as plain text in a span. There is no role and no live region, so changes to the value are not announced."
    ]
  },
  "cwr-button": {
    "keyboard": [
      {
        "keys": "Enter / Space",
        "action": "Handled by the component. On keydown it calls preventDefault and shows the pressed style. On keyup it emits buttonClick, but only when the button is enabled and not loading."
      },
      {
        "keys": "Tab",
        "action": "Renders a native <button>, so it is in the normal tab order. It is removed from the tab order only when disabled is true."
      }
    ],
    "aria": [
      "aria-busy=\"true\" is set on the inner <button> while loading is true, and removed otherwise.",
      "The native disabled attribute is bound to disabled, but only when loading is false, because loading takes precedence."
    ],
    "notes": [
      "The accessible name comes from the label input or the projected content.",
      "While loading the button stays enabled and focusable (only aria-busy is set). Clicks and keys are ignored until it finishes.",
      "The leading and trailing cwr-icon and the loading cwr-spinner do not get aria-hidden, and the spinner has no accessible text."
    ]
  },
  "cwr-callout": {
    "keyboard": [],
    "aria": [
      "role on the host is bound to variant: 'alert' when variant is 'negative', otherwise 'status'.",
      "aria-live=\"polite\" is set on the host for every variant except 'negative', which gets no aria-live (it relies on the implicit behaviour of role=\"alert\").",
      "The leading icon gets aria-hidden=\"true\"."
    ],
    "notes": [
      "The title renders as a plain <div>, not a heading.",
      "Actions only render when hasActions is true, and only cwr-button children placed directly inside are projected. Buttons after the third are hidden with display:none."
    ]
  },
  "cwr-card": {
    "keyboard": [],
    "aria": [],
    "notes": [
      "When title is set, it renders as a heading. The level comes from the heading input (h1 to h4). If heading is not set, it is h2 when surface is 'surface' and h3 otherwise. Set heading to match the page outline.",
      "The description renders as a <p>. There is no role or aria on the card itself."
    ]
  },
  "cwr-checkbox": {
    "keyboard": [
      {
        "keys": "native <input type=checkbox>",
        "action": "Space toggles the checkbox, through the inner cwr-checkbox-input."
      }
    ],
    "aria": [
      "A wrapping <label> contains both the native checkbox and the label text, so the label text becomes the checkbox's accessible name.",
      "indeterminate is set as the native indeterminate property.",
      "Does not set aria-invalid, even when state='error'; the error is visual only."
    ],
    "notes": [
      "The label input is required and provides the accessible name.",
      "The label text (cwr-text-overflow) is set to tabindex=-1 so it is not a Tab stop.",
      "Group several checkboxes in cwr-input-control-field (role='group') for a group label and hint."
    ]
  },
  "cwr-checkbox-card": {
    "keyboard": [
      {
        "keys": "native <input type=checkbox>",
        "action": "Space toggles the checkbox, through the inner cwr-checkbox-input."
      }
    ],
    "aria": [
      "A wrapping <label> contains the checkbox and the label text, which becomes the accessible name.",
      "indeterminate is set as the native property.",
      "Does not set aria-invalid for state='error'."
    ],
    "notes": [
      "The label input is required and is the only accessible name.",
      "The label text is set to tabindex=-1 so it is not a Tab stop."
    ]
  },
  "cwr-checkbox-input": {
    "keyboard": [
      {
        "keys": "native <input type=checkbox>",
        "action": "Space toggles the checkbox; the component adds no key handlers."
      }
    ],
    "aria": [
      "Accepts aria-label and aria-labelledby inputs and passes them to the native checkbox.",
      "Binds the id, name and tabindex (tabIndex input) attributes.",
      "indeterminate is set as the native property and clears after the user clicks.",
      "Does not set aria-invalid for state='error'."
    ],
    "notes": [
      "It has no visible label, so pass aria-label or aria-labelledby, or give it an id and point an external <label for> at it."
    ]
  },
  "cwr-currency-input": {
    "keyboard": [
      {
        "keys": "native <input inputmode=decimal>",
        "action": "Standard input keys."
      },
      {
        "keys": "Digits, '.', other printable keys",
        "action": "Digits allowed up to 2 decimal places, one '.' allowed, other printable keys blocked."
      },
      {
        "keys": "Backspace, Delete, Tab, Escape, Enter, Arrow keys, Home, End, Ctrl/Cmd combinations",
        "action": "Passed through unchanged."
      },
      {
        "keys": "Paste",
        "action": "Blocked unless the result is a valid decimal; any paste marks the control as touched."
      }
    ],
    "aria": [
      "aria-invalid=\"true\" when state='error', form-field hasError, or the control is invalid and touched or dirty.",
      "aria-describedby comes from the parent cwr-form-field's describedBy (the hint or error id).",
      "Accepts an aria-labelledby input and passes it to the <input>.",
      "The currency symbol prefix is aria-hidden=\"true\"."
    ],
    "notes": [
      "Wrap it in cwr-form-field and set labelFor to the same value as id; the hint and error text are linked automatically.",
      "Has no overflow preview, so the native <input> is always in the DOM."
    ]
  },
  "cwr-date-input": {
    "keyboard": [
      {
        "keys": "native <input type=text inputmode=numeric> x3",
        "action": "Three separate segment inputs (day, month, year), ordered by the browser locale."
      },
      {
        "keys": "Digits 0-9",
        "action": "Allowed; filling a segment to its maximum length moves focus to the next segment and selects it."
      },
      {
        "keys": "Backspace (in an empty segment)",
        "action": "Prevented; moves focus to the previous segment and selects it."
      },
      {
        "keys": "Delete, Arrow keys, Tab, Home, End, Enter",
        "action": "Passed through unchanged."
      },
      {
        "keys": "Other printable keys",
        "action": "Blocked with preventDefault."
      },
      {
        "keys": "Ctrl/Meta/Alt combinations",
        "action": "Ignored by the handler, so native behavior applies."
      },
      {
        "keys": "Paste",
        "action": "Removes non-digits, spreads the digits across segments, and focuses the segment after the last one filled."
      }
    ],
    "aria": [
      "Each segment input gets aria-label 'Day', 'Month' or 'Year'.",
      "aria-invalid=\"true\" on every segment when state='error', form-field hasError, the date is impossible, the date is incomplete after blur, or the control is invalid and touched.",
      "aria-describedby on every segment comes from the parent cwr-form-field's describedBy.",
      "The calendar icon and the separators are aria-hidden=\"true\"."
    ],
    "notes": [
      "There is no id input, so cwr-form-field's labelFor can't be linked to it; each segment's accessible name is only 'Day', 'Month' or 'Year'.",
      "The segments are not wrapped in a group role, so the field label is not attached to them for assistive tech.",
      "On blur, partly filled segments are zero-padded, and 2-digit years are expanded."
    ]
  },
  "cwr-dialog": {
    "keyboard": [
      {
        "keys": "Escape",
        "action": "Listens on the document. If dismissible, runs the close animation and then emits dismiss; with reduced motion it emits dismiss immediately."
      },
      {
        "keys": "Tab / Shift+Tab",
        "action": "Focus is trapped inside the dialog by the Angular CDK FocusTrap."
      }
    ],
    "aria": [
      "The panel has role=dialog and aria-modal=true.",
      "aria-labelledby points to the header's h2 title id.",
      "aria-describedby points to the intro paragraph id, only when introText is set.",
      "The backdrop is aria-hidden."
    ],
    "notes": [
      "The required title input supplies the accessible name.",
      "On open, focus goes to the first focusable element in the body, else the first enabled footer button. Unlike the modal and drawer, there is no fallback to the header button.",
      "Focus returns to the element that was focused when the dialog was created, once it is destroyed.",
      "The dialog only emits dismiss; the consumer must remove it from the DOM.",
      "Body scroll is locked while it is open.",
      "headerDirection='column' hides the header close button, so provide a footer action or rely on Escape.",
      "dismissible=false hides the close button and turns off Escape."
    ]
  },
  "cwr-divider": {
    "keyboard": [],
    "aria": [
      "The host always has aria-hidden=\"true\"."
    ],
    "notes": [
      "It is purely visual and does not add role=\"separator\"."
    ]
  },
  "cwr-drawer": {
    "keyboard": [
      {
        "keys": "Escape",
        "action": "Listens on the document. If dismissible, runs the slide-out animation and then emits dismiss; with reduced motion it emits dismiss immediately."
      },
      {
        "keys": "Tab / Shift+Tab",
        "action": "Focus is trapped inside the drawer by the Angular CDK FocusTrap."
      }
    ],
    "aria": [
      "The panel has role=dialog and aria-modal=true.",
      "aria-labelledby points to the header's h2 title id.",
      "aria-describedby points to the intro paragraph id, only when introText is set.",
      "The backdrop is aria-hidden."
    ],
    "notes": [
      "The required title input supplies the accessible name.",
      "On open, focus goes to the first focusable element in the body, else the first enabled footer button, else the header button.",
      "Focus returns to the element that was focused when the drawer was created, once it is destroyed.",
      "The drawer only emits dismiss; the consumer must remove it from the DOM.",
      "Body scroll is locked while it is open.",
      "dismissible=false hides the close button and turns off Escape."
    ]
  },
  "cwr-email-input": {
    "keyboard": [
      {
        "keys": "native <input type=email>",
        "action": "Standard input keys; the component adds no key handlers."
      },
      {
        "keys": "Tab",
        "action": "When unfocused with a value, focus lands on a tabindex=0 overflow preview that swaps in the real <input>."
      }
    ],
    "aria": [
      "aria-invalid=\"true\" on the <input> for any of: state='error', form-field hasError, an invalid touched or dirty control, or a failed email pattern check on blur.",
      "The leading email icon is aria-hidden=\"true\".",
      "Binds required, id, name and autocomplete; sets no aria-describedby."
    ],
    "notes": [
      "Wrap it in cwr-form-field and set labelFor to the same value as id.",
      "When bound to a form control, it adds Validators.email to that control automatically.",
      "While unfocused with a value, the <input> is replaced by a text preview with no label or role.",
      "Emits validationError (true or false) on blur so consumers can show error text."
    ]
  },
  "cwr-empty-state-content-block": {
    "keyboard": [],
    "aria": [],
    "notes": [
      "The illustration is decorative (cwr-illustration sets aria-hidden=\"true\").",
      "The title and description render as plain <div>s, not a heading, and there is no role or live region.",
      "Only cwr-button, cwr-inline-button and cwr-menu-button are projected as actions, and only when hasActions is true."
    ]
  },
  "cwr-fieldset": {
    "keyboard": [],
    "aria": [
      "Renders a native <fieldset>, with a <legend> only when legend is not blank.",
      "When legend and description are both set, the description <p> gets an id and the fieldset's aria-describedby points to it."
    ],
    "notes": [
      "The <legend> sits inside a wrapper div rather than being the fieldset's first child, which can stop it from naming the group in some browsers and assistive tech.",
      "description has no effect unless legend is set."
    ]
  },
  "cwr-form": {
    "keyboard": [],
    "aria": [
      "Renders a native <form> element that gets aria-busy=\"true\" while submitting is true.",
      "While submitting, the content wrapper gets the inert attribute, so projected fields can't be focused or used.",
      "While submitting, it renders a <p aria-live=\"polite\">Submitting…</p> announcer.",
      "When hasError is true, it renders a cwr-callout variant=\"negative\", whose host gets role=\"alert\" (built from errorTitle and errorHint)."
    ],
    "notes": [
      "When bound with [formGroup] on the same host, submitting=true disables the FormGroup and submitting=false re-enables it.",
      "The error callout only appears when hasError is true; set errorTitle so it has text to announce."
    ]
  },
  "cwr-form-field": {
    "keyboard": [],
    "aria": [
      "Renders a <label> with [attr.for] bound to labelFor (omitted when labelFor is empty).",
      "The mandatory asterisk is aria-hidden=\"true\", and no aria-required is set.",
      "The hint or error text span gets a generated id (form-field-hint-N); errorText replaces hintText when hasError is true.",
      "It provides FORM_FIELD_CONTEXT to its children: hasError() makes child inputs set aria-invalid, and describedBy() exposes the hint id."
    ],
    "notes": [
      "Set labelFor to the same value as the child input's id input, or the label is not linked to the control.",
      "Only cwr-date-input, cwr-currency-input, cwr-picker-input and cwr-select-input read describedBy from this context. Text, email, numeric, percent, search and textarea inputs don't get aria-describedby from the hint or error text.",
      "Because mandatory is visual only, set required on the child input to expose the requirement."
    ]
  },
  "cwr-hint": {
    "keyboard": [
      {
        "keys": "Tab (focus)",
        "action": "When focus lands inside its parent element and matches :focus-visible, the hint is shown. It is removed on focusout, unless the pointer is still over the parent."
      }
    ],
    "aria": [
      "It creates a <div role=\"tooltip\" id=\"hint-N\"> appended to document.body.",
      "While the hint is shown it sets aria-describedby on the parent element. It removes that attribute when the hint is hidden."
    ],
    "notes": [
      "It attaches to its parent element, which must be focusable for keyboard users to see the hint.",
      "There is no Escape key to dismiss it.",
      "Its template is empty. The hint text comes from the hintText input."
    ]
  },
  "cwr-icon": {
    "keyboard": [],
    "aria": [],
    "notes": [
      "It sets no role, aria-hidden or label. It just inserts the fetched SVG with innerHTML.",
      "Consumers should add aria-hidden=\"true\" when the icon is decorative, or add role and aria-label on the element when it carries meaning."
    ]
  },
  "cwr-icon-button": {
    "keyboard": [
      {
        "keys": "Enter / Space",
        "action": "Handled by the component. On keydown it calls preventDefault and shows the pressed style. On keyup it emits buttonClick, unless disabled or loading is true."
      },
      {
        "keys": "Tab",
        "action": "Renders a native <button>. When it gets focus from the keyboard (:focus-visible), the hint appears."
      }
    ],
    "aria": [
      "aria-label on the inner <button> is bound to the label input. If label is not set, no aria-label is added.",
      "aria-busy=\"true\" is set while loading is true.",
      "The native disabled attribute is bound to disabled. Loading does not disable the button.",
      "When hasHint is true (the default), a cwr-hint shows label (or 'Hint' if label is empty). While it is visible, aria-describedby is set on the cwr-icon-button host, not on the inner <button>."
    ],
    "notes": [
      "The button shows only an icon, so pass label: it becomes both the aria-label and the hint text. Without it the button has no accessible name.",
      "The icon and the loading spinner do not get aria-hidden."
    ]
  },
  "cwr-illustration": {
    "keyboard": [],
    "aria": [
      "The wrapper span always has aria-hidden=\"true\"."
    ],
    "notes": [
      "It is always decorative. Any meaning it carries has to be given in nearby text."
    ]
  },
  "cwr-inline-button": {
    "keyboard": [
      {
        "keys": "Enter / Space",
        "action": "Handled by the component. On keydown it calls preventDefault and shows the pressed style. On keyup it emits buttonClick, but only when the button is enabled."
      },
      {
        "keys": "Tab",
        "action": "Renders a native <button>. It is removed from the tab order when disabled or loading is true."
      }
    ],
    "aria": [
      "aria-busy=\"true\" is set while loading is true.",
      "The native disabled attribute is set when disabled or loading is true."
    ],
    "notes": [
      "While loading, the projected label is not rendered. Only the spinner shows, with aria-hidden=\"true\", so the button has no visible or accessible label.",
      "It has a public focus() method that moves focus to the inner <button>.",
      "The leading and trailing icons do not get aria-hidden."
    ]
  },
  "cwr-input-control-field": {
    "keyboard": [],
    "aria": [
      "The host gets role from the role input: 'group' (default) or 'radiogroup'.",
      "The host gets aria-labelledby pointing to the generated id of the label span.",
      "The host gets aria-describedby pointing to the hint or error span when hintText, or hasError with errorText, is set; otherwise it is null.",
      "The host gets aria-required=\"true\" when mandatory is true, and the asterisk is aria-hidden."
    ],
    "notes": [
      "Set role=\"radiogroup\" when wrapping cwr-radio-button or cwr-radio-button-card.",
      "It provides INPUT_CONTROL_FIELD_GROUP, so nested radio buttons stop showing their own error state; the group shows the error only through its hint text.",
      "It never sets aria-invalid on the group or on the options it contains."
    ]
  },
  "cwr-listbox": {
    "keyboard": [
      {
        "keys": "ArrowDown / ArrowUp",
        "action": "When focus is on an option, moves focus to the next or previous enabled option, clamped at the ends (no wrap)."
      },
      {
        "keys": "Home / End",
        "action": "When focus is on an option (not in the search input), moves to the first or last enabled option."
      },
      {
        "keys": "Enter",
        "action": "When focus is on an option, emits optionClick for the active enabled option."
      },
      {
        "keys": "Space",
        "action": "When focus is on an option (not in a text input), emits optionClick for the active enabled option."
      },
      {
        "keys": "Escape",
        "action": "Emits closeRequested."
      },
      {
        "keys": "Tab / Shift+Tab",
        "action": "Moves between the header search, options and footer zones, and wraps from the last zone to the first and back, so focus stays inside the listbox."
      }
    ],
    "aria": [
      "The options container has role=listbox.",
      "aria-multiselectable=true is set when multiSelect is on.",
      "Each option has role=option, its id set to option.id, and a roving tabindex (0 on the active option, -1 on the rest).",
      "aria-selected reflects option.selected, or option.checked in multi-select mode.",
      "Disabled options get aria-disabled.",
      "The header search input has role=searchbox and aria-autocomplete=list, and is named only by its placeholder.",
      "Group labels use role=presentation.",
      "Option icons and chevrons are aria-hidden.",
      "Option checkboxes have tabindex=-1."
    ],
    "notes": [
      "It uses roving tabindex with real focus, not aria-activedescendant.",
      "The initial active option is the selected one, otherwise the first enabled option (always the first enabled option in multi-select mode).",
      "The listbox has no accessible name; the consumer must provide one.",
      "Escape only emits closeRequested; the consumer must close the listbox and restore focus.",
      "Mousedown on options is prevented so clicking does not steal focus.",
      "focusOptionStartingWith(char) exists as a public method for type-ahead, but the listbox's own keydown handler does not call it."
    ]
  },
  "cwr-logo": {
    "keyboard": [],
    "aria": [],
    "notes": [
      "It renders cwr-logomark and cwr-wordmark, and adds no role, label or title.",
      "Consumers need to add an accessible name (e.g. aria-label on the element or a wrapping link) or aria-hidden."
    ]
  },
  "cwr-logomark": {
    "keyboard": [],
    "aria": [],
    "notes": [
      "It renders an inline <svg> with no role, <title> or aria attributes. Consumers must label it or hide it."
    ]
  },
  "cwr-menu": {
    "keyboard": [
      {
        "keys": "ArrowDown / ArrowUp",
        "action": "Moves focus to the next or previous enabled item, wrapping at the ends."
      },
      {
        "keys": "Home / End",
        "action": "Moves focus to the first or last enabled item."
      },
      {
        "keys": "Printable character",
        "action": "Type-ahead: jumps to the next enabled item whose label starts with the typed characters. The buffer resets after 500ms."
      },
      {
        "keys": "Enter / Space (on an item)",
        "action": "Activates the item: emits itemSelected and closeRequested, or popupPointerClick for items with a popup pointer. Disabled items do nothing."
      },
      {
        "keys": "Escape",
        "action": "Prevents default and emits closeRequested."
      },
      {
        "keys": "Tab",
        "action": "Emits closeRequested; the default Tab movement still happens."
      }
    ],
    "aria": [
      "The items container has role=menu.",
      "Each item host has role=menuitem and a roving tabindex (0 on the active item, -1 on the rest).",
      "Disabled items get aria-disabled.",
      "Leading icons and the popup-pointer chevron are aria-hidden."
    ],
    "notes": [
      "The menu has no accessible name, aria-labelledby or aria-orientation.",
      "focusFirstItem() and focusLastItem() are public so cwr-menu-button can place focus.",
      "Disabled items are skipped by arrow keys and type-ahead."
    ]
  },
  "cwr-menu-button": {
    "keyboard": [
      {
        "keys": "Enter / Space (on the trigger)",
        "action": "Toggles the menu. When it opens, focus moves to the first menu item."
      },
      {
        "keys": "Click (on the trigger)",
        "action": "Toggles the menu. When it opens, focus moves to the first menu item."
      },
      {
        "keys": "ArrowDown (on the trigger)",
        "action": "Opens the menu and focuses the first item."
      },
      {
        "keys": "ArrowUp (on the trigger)",
        "action": "Opens the menu and focuses the last item."
      },
      {
        "keys": "Escape (on the trigger, while open)",
        "action": "Closes the menu and puts focus back on the trigger."
      },
      {
        "keys": "Escape / Enter / Space (inside the open popup)",
        "action": "Closes the menu and puts focus back on the trigger. The handler runs in the capture phase, so the item still activates."
      },
      {
        "keys": "Tab (inside cwr-menu)",
        "action": "The menu's closeRequested closes the popup without restoring focus."
      }
    ],
    "aria": [
      "aria-expanded is set on the trigger's focusable element and kept in sync with the open state. That element is the first button or [tabindex] inside [slot=button], otherwise the slot element itself.",
      "aria-haspopup is copied onto the trigger from the #slotFocus element's aria-haspopup attribute.",
      "No aria-controls is set."
    ],
    "notes": [
      "The projected popup must carry #slotFocus and an aria-haspopup attribute (for example aria-haspopup=\"menu\" on cwr-menu). Otherwise focus placement and close wiring do not work, and a console warning is logged.",
      "Clicking outside the trigger and popup closes the menu without restoring focus.",
      "close(restoreFocus) is public for slotted content that has no closeRequested output.",
      "There is no focus trap."
    ]
  },
  "cwr-modal": {
    "keyboard": [
      {
        "keys": "Escape",
        "action": "Listens on the document. If dismissible, runs the close animation and then emits dismiss; with reduced motion it emits dismiss immediately."
      },
      {
        "keys": "Tab / Shift+Tab",
        "action": "Focus is trapped inside the modal by the Angular CDK FocusTrap."
      }
    ],
    "aria": [
      "The panel has role=dialog and aria-modal=true.",
      "aria-labelledby points to the header's h2 title id.",
      "aria-describedby points to the intro paragraph id, only when introText is set.",
      "The backdrop is aria-hidden.",
      "The header close button's aria-label comes from its label (default 'Close')."
    ],
    "notes": [
      "The required title input supplies the accessible name.",
      "On open, focus goes to the first focusable element in the body, else the first enabled footer button, else the header button.",
      "Focus returns to the element that was focused when the modal was created, once it is destroyed.",
      "The modal only emits dismiss; the consumer must remove it from the DOM.",
      "Body scroll is locked while it is open.",
      "dismissible=false hides the close button and turns off Escape."
    ]
  },
  "cwr-navbar": {
    "keyboard": [],
    "aria": [
      "The nav wrapper div has role=navigation, with no accessible name.",
      "Nav items are anchor elements using routerLink, inside li elements."
    ],
    "notes": [
      "The component has no keyboard handlers.",
      "Logout is a div with a click handler only, so it cannot be focused or operated from the keyboard.",
      "The header close icon is a span with a click handler only, so it cannot be focused or operated from the keyboard.",
      "The What's New toggle is a button, but it has no aria-expanded.",
      "Disabled nav items only have their click prevented; no aria-disabled is set and they stay focusable.",
      "The active route is shown only with an 'active' CSS class; no aria-current is set.",
      "The ul's direct children are cwr-navbar-nav-item elements that wrap each li.",
      "The Support link and the What's New links open with target=_blank and have no new-tab indication."
    ]
  },
  "cwr-numeric-input": {
    "keyboard": [
      {
        "keys": "native <input inputmode=decimal>",
        "action": "Standard input keys."
      },
      {
        "keys": "Digits 0-9",
        "action": "Allowed, but blocked when limitDecimals is true and the caret is past the decimal point with the limit already reached."
      },
      {
        "keys": ". (period)",
        "action": "Allowed once, and blocked when limitDecimals is true with decimals=0."
      },
      {
        "keys": "Other printable keys",
        "action": "Blocked with preventDefault (includes '-', since negatives are not allowed)."
      },
      {
        "keys": "Backspace, Delete, Tab, Escape, Enter, Arrow keys, Home, End, Ctrl/Cmd combinations",
        "action": "Passed through unchanged."
      },
      {
        "keys": "Paste",
        "action": "Blocked unless the result is digits with at most one '.'; a paste that goes over the decimal limit marks the control as touched."
      }
    ],
    "aria": [
      "aria-invalid=\"true\" on the <input> when state='error', form-field hasError, or the control is invalid and touched or dirty.",
      "Binds required, id, name and autocomplete; sets no aria-describedby and no aria-label."
    ],
    "notes": [
      "Wrap it in cwr-form-field and set labelFor to the same value as id.",
      "While unfocused with a value, the <input> is replaced by a tabindex=0 text preview with no label or role.",
      "The field's hint and error text are not linked through aria-describedby."
    ]
  },
  "cwr-overlay-header": {
    "keyboard": [],
    "aria": [
      "The title is rendered as an h2 with a generated id (cwr-overlay-header-title-N).",
      "The intro text is a p with a generated id (cwr-overlay-header-intro-N).",
      "The dismiss icon button's aria-label is dismissLabel (default 'Close')."
    ],
    "notes": [
      "The generated title and intro ids are what cwr-modal, cwr-dialog and cwr-drawer use for aria-labelledby and aria-describedby.",
      "The dismiss button only renders when direction='row' and dismissible is true."
    ]
  },
  "cwr-percent-input": {
    "keyboard": [
      {
        "keys": "native <input inputmode=decimal>",
        "action": "Standard input keys."
      },
      {
        "keys": "Digits, '.', other printable keys",
        "action": "Same filtering as cwr-numeric-input: digits allowed (with a decimal cap when limitDecimals is true), one '.', everything else blocked."
      },
      {
        "keys": "Backspace, Delete, Tab, Escape, Enter, Arrow keys, Home, End, Ctrl/Cmd combinations",
        "action": "Passed through unchanged."
      },
      {
        "keys": "Paste",
        "action": "Blocked unless the result is a valid decimal; a paste over the decimal limit marks the control as touched."
      }
    ],
    "aria": [
      "aria-invalid=\"true\" when state='error', form-field hasError, or the control is invalid and touched or dirty.",
      "Accepts aria-describedby, aria-labelledby and aria-label inputs and passes them through to the <input>.",
      "The same id and aria-* attributes are applied to the overflow preview while it is shown."
    ],
    "notes": [
      "Wrap it in cwr-form-field and set labelFor to the same value as id, or pass aria-label or aria-labelledby.",
      "Pass aria-describedby yourself to link hint or error text; it is not taken from the form-field context.",
      "The visible '%' symbol span is not aria-hidden."
    ]
  },
  "cwr-picker-input": {
    "keyboard": [
      {
        "keys": "Focus (Tab into the input)",
        "action": "Opens the listbox and moves focus to the selected option, or to the first enabled option if none is selected."
      },
      {
        "keys": "ArrowDown / ArrowUp / Home / End (on the input)",
        "action": "Opens the listbox and moves focus into it."
      },
      {
        "keys": "Enter / Space (on the input)",
        "action": "Opens the listbox and moves focus into it."
      },
      {
        "keys": "Printable character (on the input)",
        "action": "Opens the listbox and tries to move to the first enabled option whose label starts with that character."
      },
      {
        "keys": "Escape (on the input)",
        "action": "Closes the listbox."
      },
      {
        "keys": "ArrowDown / ArrowUp (in the listbox)",
        "action": "Moves to the next or previous enabled option. Movement stops at the first and last options and does not wrap."
      },
      {
        "keys": "Home / End (in the listbox)",
        "action": "Moves to the first or last enabled option."
      },
      {
        "keys": "Enter / Space (in the listbox)",
        "action": "Selects the active option, closes the listbox and puts focus back on the input."
      },
      {
        "keys": "Escape (in the listbox)",
        "action": "Closes the listbox and puts focus back on the input."
      },
      {
        "keys": "Tab / Shift+Tab (in the listbox)",
        "action": "Default is prevented and focus stays on the active option, because the embedded listbox has only one focus zone."
      }
    ],
    "aria": [
      "The input is readonly and has role=combobox and aria-haspopup=listbox.",
      "aria-expanded is bound to the open state.",
      "aria-controls points to the listbox id only while the listbox is open.",
      "aria-invalid='true' is set when the state is error (from the state input, form-field context or an invalid touched control).",
      "aria-describedby comes from the surrounding cwr-form-field context, if there is one.",
      "The chevron icon is aria-hidden.",
      "No aria-activedescendant is set; real DOM focus moves onto the role=option elements."
    ],
    "notes": [
      "Focus moves into the popup, so this is not an activedescendant-style combobox.",
      "Option values are used as DOM ids for the options, so they must be unique on the page.",
      "The component sets no label itself; the name must come from a cwr-form-field label or a consumer-supplied id/label association.",
      "Clicking outside or blurring out of the component closes the listbox."
    ]
  },
  "cwr-radio-button": {
    "keyboard": [
      {
        "keys": "native <input type=radio>",
        "action": "Standard radio keys; the component adds no key handlers."
      }
    ],
    "aria": [
      "A wrapping <label> makes the label text the radio's accessible name.",
      "Sets no aria-invalid and no aria-describedby; the error state is visual only and is suppressed inside cwr-input-control-field."
    ],
    "notes": [
      "The native radio has no name attribute, so the browser doesn't treat radios as one group: each one is its own Tab stop, and arrow keys don't move between options.",
      "Wrap options in cwr-input-control-field with role=\"radiogroup\" for a group label, hint and aria-required.",
      "It only emits checkedChange(true); the consumer must set checked=false on the other options."
    ]
  },
  "cwr-radio-button-card": {
    "keyboard": [
      {
        "keys": "native <input type=radio>",
        "action": "Standard radio keys; the component adds no key handlers."
      }
    ],
    "aria": [
      "A wrapping <label> makes the label text the radio's accessible name.",
      "Sets no aria-invalid; the error state is suppressed inside cwr-input-control-field."
    ],
    "notes": [
      "The native radio has no name attribute, so arrow keys don't move between options and each card is its own Tab stop.",
      "Wrap cards in cwr-input-control-field with role=\"radiogroup\".",
      "It only emits checkedChange(true); the consumer must manage exclusive selection."
    ]
  },
  "cwr-scrollbar": {
    "keyboard": [],
    "aria": [
      "The thumb has aria-hidden=\"true\"."
    ],
    "notes": [
      "The thumb can only be dragged with a pointer and has no keyboard handling.",
      "It hides the native scrollbar of the element just before it but does not make that element focusable. Consumers should give the scroll container tabindex=\"0\" (and a label) so it can be scrolled with the keyboard."
    ]
  },
  "cwr-search-input": {
    "keyboard": [
      {
        "keys": "native <input type=search>",
        "action": "Standard search-input keys."
      },
      {
        "keys": "Escape",
        "action": "Handled with (keydown.escape): blurs the input."
      },
      {
        "keys": "Tab",
        "action": "When unfocused with a value, focus lands on a tabindex=0 overflow preview (tabindex -1 when disabled or read-only), which swaps in the input."
      },
      {
        "keys": "native <button> (clear)",
        "action": "When there is a value, a cwr-icon-button clear button clears it and moves focus back to the input."
      }
    ],
    "aria": [
      "Accepts an aria-label input and passes it to the <input>.",
      "aria-invalid=\"true\" when state='error', form-field hasError, or the control is invalid and touched or dirty.",
      "The search icon is aria-hidden=\"true\".",
      "The clear button has aria-label 'Clear search'."
    ],
    "notes": [
      "There is no id input, so a cwr-form-field label can't be linked; pass aria-label to name the input.",
      "It uses a plain input, not role=search or a combobox, and sets no aria-describedby."
    ]
  },
  "cwr-segment-control": {
    "keyboard": [],
    "aria": [
      "The host has role=radiogroup.",
      "Each segment is a native input type=radio, and all segments share a generated name.",
      "Each radio's aria-label is the item label, or item.ariaLabel for the icon-only variant, with ', <badge>' appended when a badge is present.",
      "The visible content (icon, label, badge) is aria-hidden."
    ],
    "notes": [
      "The component handles no keys itself; arrow-key movement is the browser's native radio-group behaviour.",
      "The icon-only variant needs ariaLabel on every item; a console warning is logged if one is missing.",
      "The radiogroup gets no accessible name; the consumer must add one, for example aria-label on the host.",
      "The consumer must update checkedValue from checkedValueChange."
    ]
  },
  "cwr-select-input": {
    "keyboard": [
      {
        "keys": "Focus / click",
        "action": "Opens the popup and selects the current label text, so typing replaces it. Focus stays in the input."
      },
      {
        "keys": "Typing",
        "action": "Updates the query and opens the popup. searchChange is emitted after debounceMs, once the query is empty or at least minQueryLength long."
      },
      {
        "keys": "ArrowDown / ArrowUp / Home / End (on the input)",
        "action": "Opens the popup, moves focus into the listbox and replays the key there."
      },
      {
        "keys": "Enter (on the input)",
        "action": "Selects the listbox option that currently holds the roving tabindex."
      },
      {
        "keys": "Escape (on the input)",
        "action": "Discards the typed query and closes the popup."
      },
      {
        "keys": "ArrowDown / ArrowUp (in the listbox)",
        "action": "Moves to the next or previous enabled option, clamped at the ends."
      },
      {
        "keys": "Home / End (in the listbox)",
        "action": "Moves to the first or last enabled option."
      },
      {
        "keys": "Enter / Space (in the listbox)",
        "action": "Selects the active option, closes the popup and puts focus back on the input."
      },
      {
        "keys": "Escape (in the listbox)",
        "action": "Discards the typed query, closes the popup and puts focus back on the input."
      },
      {
        "keys": "Tab / Shift+Tab (in the listbox)",
        "action": "Default is prevented and focus stays on the active option, because the embedded listbox has only one focus zone."
      }
    ],
    "aria": [
      "The input has role=combobox, aria-autocomplete=list and aria-haspopup=listbox.",
      "aria-expanded is bound to whether the popup is shown (loading, error, empty or options).",
      "aria-controls points to the listbox id only while the listbox itself is rendered.",
      "aria-invalid='true' is set in the error state, and aria-describedby comes from the cwr-form-field context.",
      "The loading and empty-results messages are rendered with role=status.",
      "The search error message is rendered with role=alert.",
      "The chevron and error icons are aria-hidden.",
      "No aria-activedescendant is set; arrow keys move real focus into the listbox."
    ],
    "notes": [
      "The component never runs the search itself; the consumer handles searchChange and passes options, loading and searchError back in.",
      "With allowEmptyValue, clearing the text and blurring sets the value to null.",
      "Option values are used as DOM ids for the options, so they must be unique on the page.",
      "The component sets no label itself; the name must come from a cwr-form-field or the consumer."
    ]
  },
  "cwr-snackbar": {
    "keyboard": [],
    "aria": [
      "The host has role=status and aria-live=polite.",
      "For variant='negative' the host has role=alert instead, with no aria-live attribute.",
      "The variant icon is aria-hidden.",
      "The dismiss icon button has aria-label 'Dismiss'."
    ],
    "notes": [
      "It auto-dismisses after 5000ms by default. The timer pauses on hover or when focus is inside, and resumes 200ms after both end.",
      "There is no Escape handling, and focus is never moved to the snackbar.",
      "Action buttons dismiss the snackbar after onClick unless closeOnClick is false.",
      "Only the first projected cwr-button and the first projected cwr-inline-button are shown."
    ]
  },
  "cwr-snackbar-stack": {
    "keyboard": [],
    "aria": [],
    "notes": [
      "The stack sets no role or live region itself; each snackbar carries its own role=status or role=alert.",
      "SnackbarStackService creates one stack per position and appends it to the body when first needed.",
      "Each snackbar is appended with its role and content already rendered.",
      "At most 3 snackbars are visible per position by default (maxVisible); extra ones are queued."
    ]
  },
  "cwr-spinner": {
    "keyboard": [],
    "aria": [],
    "notes": [
      "It renders a spinning cwr-icon with no role, aria-label or live region. Consumers must announce the loading state themselves (e.g. aria-busy on the container)."
    ]
  },
  "cwr-status-pill": {
    "keyboard": [],
    "aria": [],
    "notes": [
      "It renders label, separator and value as plain text. Intent is only a data attribute used for styling, so the status is not conveyed to assistive technology beyond that text.",
      "The leading and trailing icons do not get aria-hidden."
    ]
  },
  "cwr-styled-link": {
    "keyboard": [
      {
        "keys": "Enter",
        "action": "Renders a native <a>, so the browser handles link activation. The component has no key handlers of its own."
      }
    ],
    "aria": [
      "When disabled with href: the href is removed, and aria-disabled=\"true\" and tabindex=\"-1\" are set.",
      "When disabled with routerLink: it renders a plain <a> with no href, aria-disabled or tabindex, so it cannot be focused and is not announced as disabled.",
      "The trailing icon (external-link by default) gets aria-hidden=\"true\"."
    ],
    "notes": [
      "The accessible name comes from the projected content.",
      "When target is '_blank', no 'opens in new tab' text is added. The consumer has to provide it in the content if needed."
    ]
  },
  "cwr-tab-bar": {
    "keyboard": [
      {
        "keys": "ArrowRight / ArrowLeft",
        "action": "Moves to the next or previous enabled tab, wrapping at the ends. It selects that tab (emits checkedValueChange), focuses it and scrolls it into view."
      },
      {
        "keys": "Home / End",
        "action": "Selects and focuses the first or last enabled tab."
      },
      {
        "keys": "Tab",
        "action": "Only the selected tab is in the tab order (roving tabindex)."
      }
    ],
    "aria": [
      "The host has role=tablist.",
      "Each tab is a button with role=tab.",
      "aria-selected is bound to the checked state.",
      "aria-label is the label, with ', <badge>' appended when a badge is present.",
      "aria-controls is bound to item.panelId when it is provided.",
      "Disabled tabs get the native disabled attribute and tabindex=-1.",
      "The overflow scroll buttons are aria-hidden and have tabindex=-1."
    ],
    "notes": [
      "Selection follows focus: arrow keys change the selected tab straight away.",
      "The consumer must render the role=tabpanel elements and pass their ids as panelId.",
      "The consumer must update checkedValue from checkedValueChange.",
      "No aria-orientation is set, and the tablist has no accessible name."
    ]
  },
  "cwr-text-input": {
    "keyboard": [
      {
        "keys": "native <input type=text>",
        "action": "Standard text-input keys; the component adds no key handlers (type is configurable)."
      },
      {
        "keys": "Tab",
        "action": "When the field is unfocused and has a value, focus lands on a tabindex=0 cwr-text-overflow preview, which then swaps in and focuses the real <input>."
      }
    ],
    "aria": [
      "aria-invalid=\"true\" on the <input> when state='error', the parent cwr-form-field has hasError, or the bound form control is invalid and touched or dirty.",
      "Binds required, id, name, autocomplete, maxlength, pattern and inputmode to the native input.",
      "Sets no aria-describedby and no aria-label."
    ],
    "notes": [
      "Wrap it in cwr-form-field and set labelFor to the same value as id to get a visible, linked label.",
      "While unfocused with a value, the <input> is removed from the DOM and replaced by a text preview that has no role, label or aria-invalid, so the label's for target is missing at that point.",
      "The field's hint and error text are not linked through aria-describedby."
    ]
  },
  "cwr-text-overflow": {
    "keyboard": [
      {
        "keys": "Tab",
        "action": "The host has tabindex=\"0\". On focus it resets the text's scrollLeft to 0."
      }
    ],
    "aria": [
      "When the text is truncated, a cwr-hint (role=\"tooltip\") with the full text is attached to an inner span, and aria-describedby is set on that span while the hint is shown."
    ],
    "notes": [
      "Focusing the host does not show the hint, because the hint listens for focus on an inner span, not the host. In practice the hint only appears on hover.",
      "In single-line mode (trailing or middle truncation), the page only contains the shortened text with '…'. The full text is only available through the hint.",
      "The host has no role or aria-label, even though it is in the tab order."
    ]
  },
  "cwr-textarea-input": {
    "keyboard": [
      {
        "keys": "native <textarea>",
        "action": "Standard textarea keys; the component adds no key handlers."
      }
    ],
    "aria": [
      "aria-invalid=\"true\" when the effective state is error (state input, form-field hasError, or invalid form control) and the field is not disabled or read-only.",
      "Binds required, id, name and maxlength to the native textarea.",
      "Sets no aria-describedby and no aria-label."
    ],
    "notes": [
      "Wrap it in cwr-form-field and set labelFor to the same value as id.",
      "The decorative resize-handle SVG shown when canResize is true is not aria-hidden.",
      "The field's hint and error text are not linked through aria-describedby."
    ]
  },
  "cwr-title-block": {
    "keyboard": [],
    "aria": [],
    "notes": [
      "The title renders as <h1> when variant is 'title' (the default) and as <h2> when variant is 'section'. Use only one 'title' variant per page."
    ]
  },
  "cwr-toggle": {
    "keyboard": [
      {
        "keys": "native <input type=checkbox role=switch>",
        "action": "Space toggles the switch and emits checkedChange(!checked); the component adds no key handlers."
      }
    ],
    "aria": [
      "The input has role=\"switch\", with aria-checked bound to checked.",
      "aria-label is bound to the label input, and the input is also wrapped in a <label>.",
      "aria-describedby points to the hint or error caption id when hintText, or state='error' with errorText, is set.",
      "aria-busy=\"true\" while state='loading'; clicks are prevented and changes ignored while loading.",
      "The thumb is aria-hidden=\"true\".",
      "Does not set aria-invalid for state='error'."
    ],
    "notes": [
      "The label input is required and provides the accessible name.",
      "It is controlled: the consumer must update checked from checkedChange.",
      "The label text is set to tabindex=-1 so it is not a Tab stop."
    ]
  },
  "cwr-toggle-card": {
    "keyboard": [
      {
        "keys": "native <input type=checkbox role=switch>",
        "action": "Space toggles the switch, through the inner cwr-toggle."
      }
    ],
    "aria": [
      "Inherits the inner cwr-toggle's role=switch, aria-checked, aria-label, aria-describedby and aria-busy.",
      "The card surface itself has no role."
    ],
    "notes": [
      "A click anywhere on the card toggles it (mouse only); the card surface is not a separate focus target.",
      "The focus ring appears on the card wrapper when the inner switch has focus-visible.",
      "Changes are ignored while disabled or state='loading'."
    ]
  },
  "cwr-tooltip": {
    "keyboard": [
      {
        "keys": "Tab (focus)",
        "action": "Shows the tooltip when focus lands inside the parent element and matches :focus-visible. It hides on focusout, unless focus moves into the tooltip."
      },
      {
        "keys": "Tab",
        "action": "On keydown on the parent, if the tooltip has a link (linkHref is set), preventDefault is called and focus moves to that link. Shift+Tab is not intercepted."
      }
    ],
    "aria": [
      "It renders cwr-tooltip-bubble with role=\"tooltip\" and id=\"tooltip-N\", appended to document.body.",
      "While the tooltip is shown it sets aria-describedby on the parent element, and removes it when the tooltip is hidden."
    ],
    "notes": [
      "It attaches to its parent element, which must be focusable.",
      "There is no Escape key to dismiss it.",
      "The link inside the tooltip (linkHref) opens with target=\"_blank\" rel=\"noopener\", and its text comes from linkLabel (default 'Find out more')."
    ]
  },
  "cwr-tooltip-icon": {
    "keyboard": [
      {
        "keys": "Tab",
        "action": "The host has tabindex=\"0\", so it can receive focus. Focus from the keyboard shows the tooltip."
      },
      {
        "keys": "Tab (while focused)",
        "action": "If linkHref is set, Tab moves focus into the link inside the tooltip (handled by cwr-tooltip)."
      }
    ],
    "aria": [
      "aria-label on the host is bound to label. It is omitted when label is empty.",
      "aria-describedby on the host points to the tooltip while the tooltip is shown."
    ],
    "notes": [
      "The host has no role, so it is a focusable element without one. Pass label so it has an accessible name.",
      "The label text is used both as the aria-label and inside the tooltip that aria-describedby points to.",
      "The info cwr-icon inside does not get aria-hidden."
    ]
  },
  "cwr-wordmark": {
    "keyboard": [],
    "aria": [],
    "notes": [
      "It renders an inline <svg> with no role, <title> or aria attributes, so the brand text is not exposed. Consumers must label it or hide it."
    ]
  }
};
