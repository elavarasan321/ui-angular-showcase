// GENERATED FILE — do not edit by hand. Run `npm run generate:api` to regenerate.

export interface ApiInput {
  name: string;
  type: string;
  /** Allowed values when `type` is an alias of a small literal union. */
  values?: string[];
  required: boolean;
  default?: string;
  description?: string;
}

export interface ApiOutput {
  name: string;
  type: string;
  description?: string;
}

export interface ApiEntry {
  className: string;
  inputs: ApiInput[];
  outputs: ApiOutput[];
}

export { UI_ANGULAR_VERSION } from '../../library-version.generated';

export const API_REFERENCE: Record<string, ApiEntry> = {
  "cwr-icon": {
    "className": "IconComponent",
    "inputs": [
      {
        "name": "icon",
        "type": "IconKey",
        "required": true,
        "default": "'icon.ui.placeholder'",
        "description": "The icon key to display"
      },
      {
        "name": "size",
        "type": "IconSize",
        "values": [
          "'xs'",
          "'sm'",
          "'md'",
          "'lg'",
          "'xl'"
        ],
        "required": false,
        "default": "'md'",
        "description": "Size of the icon"
      },
      {
        "name": "color",
        "type": "IconColorKey",
        "required": false,
        "default": "'color.icon.surface'",
        "description": "CSS color variable to apply to the icon"
      }
    ],
    "outputs": []
  },
  "cwr-navbar": {
    "className": "Navbar",
    "inputs": [
      {
        "name": "navItems",
        "type": "NavbarNavItem[]",
        "required": false,
        "default": "[]"
      },
      {
        "name": "collapsed",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "showToggle",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "hoveredItem",
        "type": "string | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "whatsNewItems",
        "type": "WhatsNewItem[]",
        "required": false,
        "default": "[]"
      },
      {
        "name": "hasNew",
        "type": "boolean",
        "required": false,
        "default": "false"
      }
    ],
    "outputs": [
      {
        "name": "navItemClick",
        "type": "NavbarNavItem"
      },
      {
        "name": "collapsedChange",
        "type": "boolean"
      },
      {
        "name": "logOutAction",
        "type": "boolean"
      }
    ]
  },
  "cwr-illustration": {
    "className": "IllustrationComponent",
    "inputs": [
      {
        "name": "illustration",
        "type": "IllustrationKey",
        "required": true,
        "default": "'illustration.ui.placeholder'",
        "description": "The illustration key to display"
      },
      {
        "name": "size",
        "type": "IllustrationSize",
        "values": [
          "'xs'",
          "'sm'",
          "'md'",
          "'lg'"
        ],
        "required": false,
        "default": "'md'",
        "description": "Size of the illustration"
      },
      {
        "name": "primaryColor",
        "type": "IllustrationColorKey",
        "required": false,
        "description": "CSS color for the primary path (focal element)"
      },
      {
        "name": "secondaryColor",
        "type": "IllustrationColorKey",
        "required": false,
        "description": "CSS color for the secondary path (background shape)"
      },
      {
        "name": "primaryOpacity",
        "type": "string",
        "required": false,
        "description": "Opacity for the primary path"
      },
      {
        "name": "secondaryOpacity",
        "type": "string",
        "required": false,
        "description": "Opacity for the secondary path"
      }
    ],
    "outputs": []
  },
  "cwr-logo": {
    "className": "LogoComponent",
    "inputs": [
      {
        "name": "showWordmark",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "The showWordmark key to display the wordmark"
      },
      {
        "name": "showLogomark",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "The showLogomark key to display the logomark"
      },
      {
        "name": "size",
        "type": "LogoSize",
        "values": [
          "'xs'",
          "'sm'",
          "'md'",
          "'lg'"
        ],
        "required": false,
        "default": "'lg'",
        "description": "Size of the logo"
      }
    ],
    "outputs": []
  },
  "cwr-logomark": {
    "className": "LogomarkComponent",
    "inputs": [
      {
        "name": "size",
        "type": "LogoSize",
        "values": [
          "'xs'",
          "'sm'",
          "'md'",
          "'lg'"
        ],
        "required": false,
        "default": "'lg'",
        "description": "Size of the logomark"
      }
    ],
    "outputs": []
  },
  "cwr-wordmark": {
    "className": "WordmarkComponent",
    "inputs": [
      {
        "name": "size",
        "type": "LogoSize",
        "values": [
          "'xs'",
          "'sm'",
          "'md'",
          "'lg'"
        ],
        "required": false,
        "default": "'lg'",
        "description": "Size of the wordmark"
      }
    ],
    "outputs": []
  },
  "cwr-button": {
    "className": "ButtonComponent",
    "inputs": [
      {
        "name": "variant",
        "type": "ButtonVariant",
        "values": [
          "'solid'",
          "'outline'",
          "'ghost'"
        ],
        "required": false,
        "default": "'solid'"
      },
      {
        "name": "intent",
        "type": "ButtonIntent",
        "values": [
          "'brand'",
          "'neutral'",
          "'positive'",
          "'warning'",
          "'caution'",
          "'negative'"
        ],
        "required": false
      },
      {
        "name": "size",
        "type": "ButtonSize",
        "values": [
          "'xs'",
          "'sm'",
          "'md'"
        ],
        "required": false,
        "default": "'md'"
      },
      {
        "name": "label",
        "type": "string | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "leadingIcon",
        "type": "ButtonIconKey",
        "required": false
      },
      {
        "name": "trailingIcon",
        "type": "ButtonIconKey",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false"
      }
    ],
    "outputs": [
      {
        "name": "buttonClick",
        "type": "void"
      }
    ]
  },
  "cwr-hint": {
    "className": "HintComponent",
    "inputs": [
      {
        "name": "hintText",
        "type": "string",
        "required": false,
        "default": "'Hint'"
      },
      {
        "name": "arrowPosition",
        "type": "HintArrowPosition",
        "values": [
          "'bottom'",
          "'top'",
          "'left'",
          "'right'",
          "'bottom left'",
          "'bottom right'",
          "'top left'",
          "'top right'"
        ],
        "required": false,
        "default": "'bottom'"
      }
    ],
    "outputs": []
  },
  "cwr-tooltip": {
    "className": "TooltipComponent",
    "inputs": [
      {
        "name": "label",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "hintText",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "linkHref",
        "type": "string | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "linkLabel",
        "type": "string",
        "required": false,
        "default": "TOOLTIP_DEFAULT_LINK_LABEL"
      },
      {
        "name": "linkTrailingIcon",
        "type": "IconKey | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "arrowPosition",
        "type": "HintArrowPosition",
        "values": [
          "'bottom'",
          "'top'",
          "'left'",
          "'right'",
          "'bottom left'",
          "'bottom right'",
          "'top left'",
          "'top right'"
        ],
        "required": false,
        "default": "'bottom'"
      }
    ],
    "outputs": []
  },
  "cwr-tooltip-icon": {
    "className": "TooltipIconComponent",
    "inputs": [
      {
        "name": "size",
        "type": "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        "required": false,
        "default": "'sm'"
      },
      {
        "name": "color",
        "type": "ColorToken | undefined",
        "required": false
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "hintText",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "linkHref",
        "type": "string | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "linkLabel",
        "type": "string",
        "required": false,
        "default": "TOOLTIP_DEFAULT_LINK_LABEL"
      },
      {
        "name": "linkTrailingIcon",
        "type": "IconKey | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "arrowPosition",
        "type": "_checkworkrights_ui_angular.HintArrowPosition",
        "required": false,
        "default": "'bottom'"
      }
    ],
    "outputs": []
  },
  "cwr-icon-button": {
    "className": "IconButtonComponent",
    "inputs": [
      {
        "name": "icon",
        "type": "IconKey",
        "required": true
      },
      {
        "name": "label",
        "type": "string | undefined",
        "required": false
      },
      {
        "name": "variant",
        "type": "'solid' | 'outline' | 'ghost'",
        "required": false,
        "default": "'solid'"
      },
      {
        "name": "intent",
        "type": "'neutral' | 'brand' | 'positive' | 'warning' | 'caution' | 'negative'",
        "required": false,
        "default": "'brand'"
      },
      {
        "name": "size",
        "type": "'xs' | 'sm' | 'md'",
        "required": false,
        "default": "'md'"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "tooltipPosition",
        "type": "'bottom' | 'top' | 'left' | 'right'",
        "required": false,
        "default": "'top'"
      },
      {
        "name": "hasHint",
        "type": "boolean",
        "required": false,
        "default": "true"
      }
    ],
    "outputs": [
      {
        "name": "buttonClick",
        "type": "void"
      }
    ]
  },
  "cwr-spinner": {
    "className": "SpinnerComponent",
    "inputs": [
      {
        "name": "size",
        "type": "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        "required": false,
        "default": "'md'"
      }
    ],
    "outputs": []
  },
  "cwr-inline-button": {
    "className": "InlineButtonComponent",
    "inputs": [
      {
        "name": "variant",
        "type": "InlineButtonVariant",
        "values": [
          "'brand'",
          "'neutral'",
          "'positive'",
          "'warning'",
          "'caution'",
          "'negative'"
        ],
        "required": false,
        "default": "'brand'"
      },
      {
        "name": "leadingIcon",
        "type": "IconKey",
        "required": false
      },
      {
        "name": "trailingIcon",
        "type": "IconKey",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false"
      }
    ],
    "outputs": [
      {
        "name": "buttonClick",
        "type": "void"
      }
    ]
  },
  "cwr-text-overflow": {
    "className": "TextOverflowComponent",
    "inputs": [
      {
        "name": "text",
        "type": "string",
        "required": true
      },
      {
        "name": "truncation",
        "type": "TextOverflowTruncation",
        "values": [
          "'trailing'",
          "'middle'"
        ],
        "required": false,
        "default": "'trailing'"
      },
      {
        "name": "position",
        "type": "TextOverflowPosition",
        "values": [
          "'top'",
          "'bottom'"
        ],
        "required": false,
        "default": "'top'"
      },
      {
        "name": "maxLines",
        "type": "number",
        "required": false,
        "default": "1"
      }
    ],
    "outputs": []
  },
  "cwr-form-field": {
    "className": "FormFieldComponent",
    "inputs": [
      {
        "name": "label",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "mandatory",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "hasError",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "hintText",
        "type": "string | undefined",
        "required": false,
        "default": "undefined"
      },
      {
        "name": "errorText",
        "type": "string | undefined",
        "required": false,
        "default": "undefined"
      },
      {
        "name": "labelFor",
        "type": "string",
        "required": false,
        "default": "''"
      }
    ],
    "outputs": []
  },
  "cwr-input-control-field": {
    "className": "InputControlFieldComponent",
    "inputs": [
      {
        "name": "label",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "mandatory",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "layout",
        "type": "InputControlFieldLayout",
        "values": [
          "'vstack'",
          "'grid'"
        ],
        "required": false,
        "default": "'vstack'"
      },
      {
        "name": "role",
        "type": "InputControlFieldRole",
        "values": [
          "'group'",
          "'radiogroup'"
        ],
        "required": false,
        "default": "'group'"
      },
      {
        "name": "hintText",
        "type": "string",
        "required": false,
        "default": "undefined"
      },
      {
        "name": "hasError",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "errorText",
        "type": "string",
        "required": false,
        "default": "undefined"
      }
    ],
    "outputs": []
  },
  "cwr-text-input": {
    "className": "TextInputComponent",
    "inputs": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "type",
        "type": "TextInputType",
        "values": [
          "'text'",
          "'password'",
          "'search'",
          "'tel'",
          "'url'"
        ],
        "required": false,
        "default": "'text'"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "autocomplete",
        "type": "string",
        "required": false,
        "default": "'off'"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "maxlength",
        "type": "number | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "pattern",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "inputmode",
        "type": "'' | TextInputInputMode",
        "required": false,
        "default": "''"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "'Enter text…'"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "state",
        "type": "InputState",
        "values": [
          "'idle'",
          "'error'"
        ],
        "required": false,
        "default": "'idle'"
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "string"
      },
      {
        "name": "focus",
        "type": "void"
      },
      {
        "name": "blur",
        "type": "void"
      }
    ]
  },
  "cwr-toggle": {
    "className": "ToggleComponent",
    "inputs": [
      {
        "name": "label",
        "type": "string",
        "required": true
      },
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "hintText",
        "type": "string",
        "required": false
      },
      {
        "name": "errorText",
        "type": "string",
        "required": false
      },
      {
        "name": "state",
        "type": "ToggleState",
        "values": [
          "'idle'",
          "'error'",
          "'loading'"
        ],
        "required": false,
        "default": "'idle'"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "position",
        "type": "LabelPosition",
        "values": [
          "'start'",
          "'end'"
        ],
        "required": false,
        "default": "'end'"
      },
      {
        "name": "focusRing",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "interactive",
        "type": "boolean",
        "required": false,
        "default": "true"
      }
    ],
    "outputs": [
      {
        "name": "checkedChange",
        "type": "boolean"
      }
    ]
  },
  "cwr-toggle-card": {
    "className": "ToggleCardComponent",
    "inputs": [
      {
        "name": "label",
        "type": "string",
        "required": true
      },
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "hintText",
        "type": "string",
        "required": false
      },
      {
        "name": "errorText",
        "type": "string",
        "required": false
      },
      {
        "name": "state",
        "type": "ToggleCardState",
        "values": [
          "'idle'",
          "'error'",
          "'loading'"
        ],
        "required": false,
        "default": "'idle'"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "position",
        "type": "ToggleCardLabelPosition",
        "values": [
          "'start'",
          "'end'"
        ],
        "required": false,
        "default": "'end'"
      }
    ],
    "outputs": [
      {
        "name": "checkedChange",
        "type": "boolean"
      }
    ]
  },
  "cwr-date-input": {
    "className": "DateInputComponent",
    "inputs": [
      {
        "name": "value",
        "type": "string | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "separator",
        "type": "string",
        "required": false,
        "default": "'/'"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "state",
        "type": "InputState",
        "values": [
          "'idle'",
          "'error'"
        ],
        "required": false,
        "default": "'idle'"
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "string"
      },
      {
        "name": "dateChange",
        "type": "Date"
      },
      {
        "name": "focus",
        "type": "void"
      },
      {
        "name": "blur",
        "type": "void"
      }
    ]
  },
  "cwr-radio-button-card": {
    "className": "RadioButtonCardComponent",
    "inputs": [
      {
        "name": "label",
        "type": "string",
        "required": true
      },
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "state",
        "type": "RadioButtonCardState",
        "values": [
          "'idle'",
          "'error'"
        ],
        "required": false,
        "default": "'idle'"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      }
    ],
    "outputs": [
      {
        "name": "checkedChange",
        "type": "boolean"
      }
    ]
  },
  "cwr-checkbox-input": {
    "className": "CheckboxInputComponent",
    "inputs": [
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "state",
        "type": "CheckboxInputState",
        "values": [
          "'idle'",
          "'error'"
        ],
        "required": false,
        "default": "'idle'"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "aria-label",
        "type": "string | undefined",
        "required": false,
        "default": "undefined"
      },
      {
        "name": "aria-labelledby",
        "type": "string | undefined",
        "required": false,
        "default": "undefined"
      },
      {
        "name": "focusRing",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "interactive",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "tabIndex",
        "type": "number | undefined",
        "required": false,
        "default": "undefined"
      }
    ],
    "outputs": [
      {
        "name": "checkedChange",
        "type": "boolean"
      }
    ]
  },
  "cwr-checkbox": {
    "className": "CheckboxComponent",
    "inputs": [
      {
        "name": "label",
        "type": "string",
        "required": true
      },
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "state",
        "type": "CheckboxState",
        "values": [
          "'idle'",
          "'error'"
        ],
        "required": false,
        "default": "'idle'"
      }
    ],
    "outputs": [
      {
        "name": "checkedChange",
        "type": "boolean"
      }
    ]
  },
  "cwr-checkbox-card": {
    "className": "CheckboxCardComponent",
    "inputs": [
      {
        "name": "label",
        "type": "string",
        "required": true
      },
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "state",
        "type": "CheckboxCardState",
        "values": [
          "'idle'",
          "'error'"
        ],
        "required": false,
        "default": "'idle'"
      }
    ],
    "outputs": [
      {
        "name": "checkedChange",
        "type": "boolean"
      }
    ]
  },
  "cwr-fieldset": {
    "className": "FieldsetComponent",
    "inputs": [
      {
        "name": "legend",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "columns",
        "type": "number",
        "required": false,
        "default": "1"
      },
      {
        "name": "columnSizes",
        "type": "number[] | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "gap",
        "type": "FieldsetGap",
        "values": [
          "'md'",
          "'lg'",
          "'xl'"
        ],
        "required": false,
        "default": "'md'"
      },
      {
        "name": "rowGap",
        "type": "FieldsetGap",
        "values": [
          "'md'",
          "'lg'",
          "'xl'"
        ],
        "required": false,
        "default": "'md'"
      }
    ],
    "outputs": []
  },
  "cwr-form": {
    "className": "FormComponent",
    "inputs": [
      {
        "name": "submitting",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "gap",
        "type": "FormGap",
        "values": [
          "'md'",
          "'lg'",
          "'xl'"
        ],
        "required": false,
        "default": "'md'"
      },
      {
        "name": "hasError",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "errorTitle",
        "type": "string",
        "required": false
      },
      {
        "name": "errorHint",
        "type": "string",
        "required": false
      }
    ],
    "outputs": []
  },
  "cwr-divider": {
    "className": "DividerComponent",
    "inputs": [
      {
        "name": "orientation",
        "type": "DividerOrientation",
        "values": [
          "'horizontal'",
          "'vertical'"
        ],
        "required": false,
        "default": "'horizontal'"
      },
      {
        "name": "size",
        "type": "DividerSize",
        "values": [
          "'default'",
          "'thick'",
          "'thickest'"
        ],
        "required": false,
        "default": "'default'"
      },
      {
        "name": "rounded",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "color",
        "type": "BorderColorKey",
        "required": false,
        "default": "'color.border.surface'"
      }
    ],
    "outputs": []
  },
  "cwr-menu": {
    "className": "MenuComponent",
    "inputs": [
      {
        "name": "items",
        "type": "CwrMenuItem[]",
        "required": false,
        "default": "[]"
      },
      {
        "name": "minWidth",
        "type": "string",
        "required": false
      },
      {
        "name": "maxWidth",
        "type": "string",
        "required": false
      }
    ],
    "outputs": [
      {
        "name": "itemSelected",
        "type": "string"
      },
      {
        "name": "closeRequested",
        "type": "void"
      },
      {
        "name": "popupPointerClick",
        "type": "string"
      }
    ]
  },
  "cwr-menu-button": {
    "className": "MenuButtonComponent",
    "inputs": [
      {
        "name": "justify",
        "type": "'left' | 'right'",
        "required": false,
        "default": "'right'"
      }
    ],
    "outputs": []
  },
  "cwr-radio-button": {
    "className": "RadioButtonComponent",
    "inputs": [
      {
        "name": "label",
        "type": "string",
        "required": true
      },
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "state",
        "type": "RadioButtonState",
        "values": [
          "'idle'",
          "'error'"
        ],
        "required": false,
        "default": "'idle'"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "showFocusRing",
        "type": "boolean",
        "required": false,
        "default": "true"
      }
    ],
    "outputs": [
      {
        "name": "checkedChange",
        "type": "boolean"
      }
    ]
  },
  "cwr-numeric-input": {
    "className": "NumericInputComponent",
    "inputs": [
      {
        "name": "value",
        "type": "number | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "'0'"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "autocomplete",
        "type": "string",
        "required": false,
        "default": "'off'"
      },
      {
        "name": "limitDecimals",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "decimals",
        "type": "number",
        "required": false,
        "default": "2"
      },
      {
        "name": "state",
        "type": "InputState",
        "values": [
          "'idle'",
          "'error'"
        ],
        "required": false,
        "default": "'idle'"
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "number | null"
      },
      {
        "name": "focus",
        "type": "void"
      },
      {
        "name": "blur",
        "type": "void"
      }
    ]
  },
  "cwr-percent-input": {
    "className": "PercentInputComponent",
    "inputs": [
      {
        "name": "value",
        "type": "number | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "'0.00'"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "autocomplete",
        "type": "string",
        "required": false,
        "default": "'off'"
      },
      {
        "name": "limitDecimals",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "decimals",
        "type": "number",
        "required": false,
        "default": "2"
      },
      {
        "name": "aria-describedby",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "state",
        "type": "InputState",
        "values": [
          "'idle'",
          "'error'"
        ],
        "required": false,
        "default": "'idle'"
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "number | null"
      },
      {
        "name": "focus",
        "type": "void"
      },
      {
        "name": "blur",
        "type": "void"
      }
    ]
  },
  "cwr-email-input": {
    "className": "EmailInputComponent",
    "inputs": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "autocomplete",
        "type": "string",
        "required": false,
        "default": "'off'"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "'email@example.com'"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "leadingIcon",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "state",
        "type": "InputState",
        "values": [
          "'idle'",
          "'error'"
        ],
        "required": false,
        "default": "'idle'"
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "string"
      },
      {
        "name": "validationError",
        "type": "boolean"
      },
      {
        "name": "focus",
        "type": "void"
      },
      {
        "name": "blur",
        "type": "void"
      }
    ]
  },
  "cwr-currency-input": {
    "className": "CurrencyInputComponent",
    "inputs": [
      {
        "name": "value",
        "type": "number | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "currencySymbol",
        "type": "string",
        "required": false,
        "default": "'$'"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "'0.00'"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "autocomplete",
        "type": "string",
        "required": false,
        "default": "'off'"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "allowDecimals",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "state",
        "type": "InputState",
        "values": [
          "'idle'",
          "'error'"
        ],
        "required": false,
        "default": "'idle'"
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "number | null"
      },
      {
        "name": "focus",
        "type": "void"
      },
      {
        "name": "blur",
        "type": "void"
      }
    ]
  },
  "cwr-callout": {
    "className": "CalloutComponent",
    "inputs": [
      {
        "name": "variant",
        "type": "CalloutVariant",
        "values": [
          "'neutral'",
          "'positive'",
          "'warning'",
          "'negative'"
        ],
        "required": false,
        "default": "'neutral'"
      },
      {
        "name": "direction",
        "type": "CalloutDirection",
        "values": [
          "'row'",
          "'column'"
        ],
        "required": false,
        "default": "'row'"
      },
      {
        "name": "title",
        "type": "string",
        "required": true
      },
      {
        "name": "hintText",
        "type": "string",
        "required": false
      },
      {
        "name": "leadingIcon",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "icon",
        "type": "IconKey",
        "required": false
      },
      {
        "name": "hasActions",
        "type": "boolean",
        "required": false,
        "default": "false"
      }
    ],
    "outputs": []
  },
  "cwr-listbox": {
    "className": "ListboxComponent",
    "inputs": [
      {
        "name": "groups",
        "type": "ListboxGroup[]",
        "required": false,
        "default": "[]"
      },
      {
        "name": "showHeader",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "showFooter",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "allowVerticalScrolling",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "hasFocus",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "multiSelect",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "searchValue",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "searchPlaceholder",
        "type": "string",
        "required": false,
        "default": "'Search'"
      },
      {
        "name": "footerLabel",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "footerLeadingIcon",
        "type": "IconKey",
        "required": false,
        "default": "undefined"
      },
      {
        "name": "footerTrailingIcon",
        "type": "IconKey",
        "required": false,
        "default": "undefined"
      }
    ],
    "outputs": [
      {
        "name": "searchValueChange",
        "type": "string"
      },
      {
        "name": "footerActionClicked",
        "type": "void"
      },
      {
        "name": "optionClick",
        "type": "ListboxOptionData"
      },
      {
        "name": "optionCheckedChange",
        "type": "ListboxOptionCheckedChange"
      },
      {
        "name": "closeRequested",
        "type": "void"
      },
      {
        "name": "activeOptionIdChange",
        "type": "string | undefined"
      }
    ]
  },
  "cwr-select-input": {
    "className": "SelectInputComponent",
    "inputs": [
      {
        "name": "options",
        "type": "SelectInputOption[]",
        "required": false,
        "default": "[]"
      },
      {
        "name": "value",
        "type": "string | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "allowEmptyValue",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "placeholderText",
        "type": "string",
        "required": false,
        "default": "'Search & select'"
      },
      {
        "name": "debounceMs",
        "type": "number",
        "required": false,
        "default": "0"
      },
      {
        "name": "minQueryLength",
        "type": "number",
        "required": false,
        "default": "1"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "searchError",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "loadingText",
        "type": "string",
        "required": false,
        "default": "'Loading…'"
      },
      {
        "name": "errorText",
        "type": "string",
        "required": false,
        "default": "'Something went wrong. Try again.'"
      },
      {
        "name": "emptyResultsText",
        "type": "string",
        "required": false,
        "default": "'No results found.'"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "state",
        "type": "InputState",
        "values": [
          "'idle'",
          "'error'"
        ],
        "required": false,
        "default": "'idle'"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "default": "''"
      }
    ],
    "outputs": [
      {
        "name": "searchChange",
        "type": "string"
      },
      {
        "name": "valueChange",
        "type": "string | null"
      },
      {
        "name": "focus",
        "type": "void"
      },
      {
        "name": "blur",
        "type": "void"
      }
    ]
  },
  "cwr-picker-input": {
    "className": "PickerInputComponent",
    "inputs": [
      {
        "name": "options",
        "type": "PickerInputOption[]",
        "required": false,
        "default": "[]"
      },
      {
        "name": "value",
        "type": "string | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "allowEmptyValue",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "placeholderText",
        "type": "string",
        "required": false,
        "default": "'Select'"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "state",
        "type": "InputState",
        "values": [
          "'idle'",
          "'error'"
        ],
        "required": false,
        "default": "'idle'"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "default": "''"
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "string"
      },
      {
        "name": "focus",
        "type": "void"
      },
      {
        "name": "blur",
        "type": "void"
      }
    ]
  },
  "cwr-search-input": {
    "className": "SearchInputComponent",
    "inputs": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "default": "''",
        "description": "Current search term. Use with [(ngModel)] or [formControl] for two-way binding."
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "'Search…'",
        "description": "Placeholder shown when the input is empty"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the input and hides the clear button"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Makes the input non-editable and hides the clear button; the value is still selectable and focusable"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "state",
        "type": "InputState",
        "values": [
          "'idle'",
          "'error'"
        ],
        "required": false,
        "default": "'idle'",
        "description": "Visual error state. Set directly when used standalone, or driven by the parent <cwr-form-field> based on validation outcome when composed inside one."
      },
      {
        "name": "debounceMs",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Milliseconds to wait after typing stops before emitting valueChange. Does not apply to clearing — see the Clearing behaviour below."
      },
      {
        "name": "minQueryLength",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Minimum term length required before valueChange is emitted. Does not apply to clearing — an empty string always emits, regardless of this value."
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "string"
      },
      {
        "name": "blur",
        "type": "void"
      }
    ]
  },
  "cwr-scrollbar": {
    "className": "ScrollbarComponent",
    "inputs": [
      {
        "name": "overflow",
        "type": "ScrollbarOverflow",
        "values": [
          "'vertical'",
          "'horizontal'"
        ],
        "required": false,
        "default": "'vertical'"
      }
    ],
    "outputs": []
  },
  "cwr-badge": {
    "className": "BadgeComponent",
    "inputs": [
      {
        "name": "intent",
        "type": "BadgeIntent",
        "values": [
          "'neutral'",
          "'brand'",
          "'positive'",
          "'warning'",
          "'caution'",
          "'negative'"
        ],
        "required": false,
        "default": "'neutral'"
      },
      {
        "name": "emphasis",
        "type": "BadgeEmphasis",
        "values": [
          "'solid'",
          "'subtle'",
          "'inverse'"
        ],
        "required": false,
        "default": "'solid'"
      },
      {
        "name": "hover",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "value",
        "type": "string | number",
        "required": true
      }
    ],
    "outputs": []
  },
  "cwr-status-pill": {
    "className": "StatusPillComponent",
    "inputs": [
      {
        "name": "intent",
        "type": "StatusPillIntent",
        "values": [
          "'neutral'",
          "'positive'",
          "'warning'",
          "'caution'",
          "'negative'"
        ],
        "required": false,
        "default": "'neutral'"
      },
      {
        "name": "variant",
        "type": "StatusPillVariant",
        "values": [
          "'outline'",
          "'solid'"
        ],
        "required": false,
        "default": "'outline'"
      },
      {
        "name": "size",
        "type": "StatusPillSize",
        "values": [
          "'sm'",
          "'xs'"
        ],
        "required": false,
        "default": "'sm'"
      },
      {
        "name": "value",
        "type": "string",
        "required": true
      },
      {
        "name": "label",
        "type": "string",
        "required": false
      },
      {
        "name": "separator",
        "type": "string",
        "required": false,
        "default": "':'"
      },
      {
        "name": "leadingIcon",
        "type": "IconKey",
        "required": false
      },
      {
        "name": "trailingIcon",
        "type": "IconKey",
        "required": false
      }
    ],
    "outputs": []
  },
  "cwr-segment-control": {
    "className": "SegmentControlComponent",
    "inputs": [
      {
        "name": "items",
        "type": "SegmentControlItem[]",
        "required": true
      },
      {
        "name": "variant",
        "type": "SegmentControlVariant",
        "values": [
          "'icon-and-text'",
          "'text-only'",
          "'icon-only'"
        ],
        "required": false,
        "default": "'icon-and-text'"
      },
      {
        "name": "checkedValue",
        "type": "string",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "checkedValueChange",
        "type": "string"
      }
    ]
  },
  "cwr-ag-grid": {
    "className": "AgGrid",
    "inputs": [
      {
        "name": "columnDefs",
        "type": "ColDef<any, any>[]",
        "required": false,
        "default": "[]"
      },
      {
        "name": "rowData",
        "type": "unknown[] | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "gridOptions",
        "type": "GridOptions<any> | undefined",
        "required": false
      },
      {
        "name": "theme",
        "type": "Theme",
        "required": false,
        "default": "cwrAgGridTheme",
        "description": "AG Grid theme applied to the grid. Defaults to `cwrAgGridTheme`, generated from CWR's design tokens so the grid tracks light/dark automatically — see `../ag-grid-theme`."
      },
      {
        "name": "masterDetail",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Enables the master/detail expandable row layout. Requires an AG Grid Enterprise licence — call `registerAgGridEnterprise()` (or add `provideAgGridEnterprise()` to your app's providers) from `@checkworkrights/ui-angular` before rendering a grid with this enabled."
      },
      {
        "name": "detailCellRendererParams",
        "type": "any",
        "required": false,
        "description": "Configuration for the detail row rendered beneath an expanded master row. Owned by the consumer, since only they know the shape of a detail record."
      },
      {
        "name": "detailCellRenderer",
        "type": "any",
        "required": false,
        "description": "Replaces AG Grid's default detail grid with a component of the consumer's own, for detail panels that need more than a grid"
      }
    ],
    "outputs": []
  },
  "cwr-snackbar": {
    "className": "SnackbarComponent",
    "inputs": [
      {
        "name": "variant",
        "type": "SnackbarVariant",
        "values": [
          "'neutral'",
          "'positive'",
          "'warning'",
          "'negative'"
        ],
        "required": false,
        "default": "'neutral'"
      },
      {
        "name": "title",
        "type": "string",
        "required": true
      },
      {
        "name": "hintText",
        "type": "string",
        "required": false
      },
      {
        "name": "hasActions",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "actions",
        "type": "SnackbarAction[]",
        "required": false,
        "default": "[]"
      },
      {
        "name": "autoDismiss",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "duration",
        "type": "number",
        "required": false,
        "default": "SNACKBAR_DEFAULT_DURATION_MS"
      }
    ],
    "outputs": [
      {
        "name": "dismissed",
        "type": "void"
      }
    ]
  },
  "cwr-snackbar-stack": {
    "className": "SnackbarStackComponent",
    "inputs": [
      {
        "name": "position",
        "type": "SnackbarStackPosition",
        "values": [
          "'bottom-start'",
          "'bottom-end'",
          "'bottom-center'"
        ],
        "required": false,
        "default": "'bottom-start'"
      }
    ],
    "outputs": []
  },
  "cwr-tab-bar": {
    "className": "TabBarComponent",
    "inputs": [
      {
        "name": "items",
        "type": "TabBarItem[]",
        "required": true
      },
      {
        "name": "checkedValue",
        "type": "string",
        "required": true
      }
    ],
    "outputs": [
      {
        "name": "checkedValueChange",
        "type": "string"
      }
    ]
  },
  "cwr-textarea-input": {
    "className": "TextareaInputComponent",
    "inputs": [
      {
        "name": "value",
        "type": "string | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "default": "''"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "maxlength",
        "type": "number | null",
        "required": false,
        "default": "null"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "'Type here…'"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "canResize",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "state",
        "type": "InputState",
        "values": [
          "'idle'",
          "'error'"
        ],
        "required": false,
        "default": "'idle'"
      }
    ],
    "outputs": [
      {
        "name": "valueChange",
        "type": "string"
      },
      {
        "name": "focus",
        "type": "void"
      },
      {
        "name": "blur",
        "type": "void"
      }
    ]
  },
  "cwr-card": {
    "className": "CardComponent",
    "inputs": [
      {
        "name": "surface",
        "type": "CardSurface",
        "values": [
          "'surface'",
          "'raised-surface'",
          "'lowered-surface'"
        ],
        "required": false,
        "default": "'surface'"
      },
      {
        "name": "edge",
        "type": "CardEdge",
        "values": [
          "'inset'",
          "'bleed'"
        ],
        "required": false,
        "default": "'inset'"
      },
      {
        "name": "title",
        "type": "string",
        "required": false
      },
      {
        "name": "description",
        "type": "string",
        "required": false
      },
      {
        "name": "heading",
        "type": "CardHeading",
        "values": [
          "'h1'",
          "'h2'",
          "'h3'",
          "'h4'"
        ],
        "required": false
      },
      {
        "name": "layout",
        "type": "CardLayout",
        "values": [
          "'auto'",
          "'inline'",
          "'stacked'"
        ],
        "required": false,
        "default": "'auto'"
      },
      {
        "name": "fill",
        "type": "boolean",
        "required": false,
        "default": "false"
      }
    ],
    "outputs": []
  },
  "cwr-overlay-header": {
    "className": "OverlayHeaderComponent",
    "inputs": [
      {
        "name": "title",
        "type": "string",
        "required": true
      },
      {
        "name": "introText",
        "type": "string",
        "required": false
      },
      {
        "name": "direction",
        "type": "OverlayHeaderDirection",
        "values": [
          "'row'",
          "'column'"
        ],
        "required": false,
        "default": "'row'"
      },
      {
        "name": "illustration",
        "type": "IllustrationKey",
        "required": false
      },
      {
        "name": "primaryColor",
        "type": "IllustrationColorKey",
        "required": false
      },
      {
        "name": "secondaryColor",
        "type": "IllustrationColorKey",
        "required": false
      },
      {
        "name": "dismissible",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "dismissLabel",
        "type": "string",
        "required": false,
        "default": "'Close'"
      },
      {
        "name": "showTabs",
        "type": "boolean",
        "required": false,
        "default": "false"
      }
    ],
    "outputs": [
      {
        "name": "dismiss",
        "type": "void"
      }
    ]
  },
  "cwr-overlay-footer": {
    "className": "OverlayFooterComponent",
    "inputs": [
      {
        "name": "justifyContent",
        "type": "OverlayFooterJustifyContent",
        "values": [
          "'space-between'",
          "'flex-end'",
          "'center'",
          "'flex-start'"
        ],
        "required": false,
        "default": "'space-between'"
      }
    ],
    "outputs": []
  },
  "cwr-modal": {
    "className": "ModalComponent",
    "inputs": [
      {
        "name": "size",
        "type": "ModalSize",
        "values": [
          "'sm'",
          "'md'",
          "'lg'",
          "'xl'"
        ],
        "required": false,
        "default": "'sm'"
      },
      {
        "name": "title",
        "type": "string",
        "required": true
      },
      {
        "name": "introText",
        "type": "string",
        "required": false
      },
      {
        "name": "illustration",
        "type": "IllustrationKey",
        "required": false
      },
      {
        "name": "primaryColor",
        "type": "IllustrationColorKey",
        "required": false
      },
      {
        "name": "secondaryColor",
        "type": "IllustrationColorKey",
        "required": false
      },
      {
        "name": "footerJustify",
        "type": "'space-between' | 'flex-end' | 'center' | 'flex-start'",
        "required": false,
        "default": "'space-between'"
      },
      {
        "name": "dismissible",
        "type": "boolean",
        "required": false,
        "default": "true"
      }
    ],
    "outputs": [
      {
        "name": "dismiss",
        "type": "void"
      }
    ]
  },
  "cwr-dialog": {
    "className": "DialogComponent",
    "inputs": [
      {
        "name": "title",
        "type": "string",
        "required": true
      },
      {
        "name": "introText",
        "type": "string",
        "required": false
      },
      {
        "name": "illustration",
        "type": "IllustrationKey",
        "required": false
      },
      {
        "name": "primaryColor",
        "type": "IllustrationColorKey",
        "required": false
      },
      {
        "name": "secondaryColor",
        "type": "IllustrationColorKey",
        "required": false
      },
      {
        "name": "headerDirection",
        "type": "OverlayHeaderDirection",
        "values": [
          "'row'",
          "'column'"
        ],
        "required": false,
        "default": "'row'"
      },
      {
        "name": "dismissible",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "footerJustify",
        "type": "OverlayFooterJustifyContent",
        "values": [
          "'space-between'",
          "'flex-end'",
          "'center'",
          "'flex-start'"
        ],
        "required": false,
        "default": "'space-between'"
      }
    ],
    "outputs": [
      {
        "name": "dismiss",
        "type": "void"
      }
    ]
  },
  "cwr-drawer": {
    "className": "DrawerComponent",
    "inputs": [
      {
        "name": "title",
        "type": "string",
        "required": true
      },
      {
        "name": "introText",
        "type": "string",
        "required": false
      },
      {
        "name": "illustration",
        "type": "IllustrationKey",
        "required": false
      },
      {
        "name": "primaryColor",
        "type": "IllustrationColorKey",
        "required": false
      },
      {
        "name": "secondaryColor",
        "type": "IllustrationColorKey",
        "required": false
      },
      {
        "name": "footerJustify",
        "type": "OverlayFooterJustifyContent",
        "values": [
          "'space-between'",
          "'flex-end'",
          "'center'",
          "'flex-start'"
        ],
        "required": false,
        "default": "'space-between'"
      },
      {
        "name": "dismissible",
        "type": "boolean",
        "required": false,
        "default": "true"
      }
    ],
    "outputs": [
      {
        "name": "dismiss",
        "type": "void"
      }
    ]
  },
  "cwr-empty-state-content-block": {
    "className": "EmptyStateContentBlockComponent",
    "inputs": [
      {
        "name": "illustration",
        "type": "IllustrationKey",
        "required": true
      },
      {
        "name": "primaryColor",
        "type": "IllustrationColorKey",
        "required": false
      },
      {
        "name": "secondaryColor",
        "type": "IllustrationColorKey",
        "required": false
      },
      {
        "name": "title",
        "type": "string",
        "required": true
      },
      {
        "name": "description",
        "type": "string",
        "required": false
      },
      {
        "name": "hasActions",
        "type": "boolean",
        "required": false,
        "default": "true"
      }
    ],
    "outputs": []
  },
  "cwr-styled-link": {
    "className": "StyledLinkComponent",
    "inputs": [
      {
        "name": "variant",
        "type": "StyledLinkVariant",
        "values": [
          "'default'",
          "'neutral'"
        ],
        "required": false,
        "default": "'default'"
      },
      {
        "name": "trailingIcon",
        "type": "IconKey",
        "required": false,
        "default": "DEFAULT_TRAILING_ICON"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "href",
        "type": "string",
        "required": false
      },
      {
        "name": "routerLink",
        "type": "string | unknown[]",
        "required": false
      },
      {
        "name": "target",
        "type": "StyledLinkTarget",
        "values": [
          "'_blank'",
          "'_self'",
          "'_parent'",
          "'_top'"
        ],
        "required": false
      },
      {
        "name": "rel",
        "type": "string",
        "required": false
      },
      {
        "name": "queryParams",
        "type": "Record<string, string>",
        "required": false
      },
      {
        "name": "queryParamsHandling",
        "type": "'merge' | 'preserve'",
        "required": false,
        "description": "How to handle query parameters: 'merge', 'preserve'"
      }
    ],
    "outputs": []
  },
  "cwr-title-block": {
    "className": "TitleBlockComponent",
    "inputs": [
      {
        "name": "variant",
        "type": "TitleBlockVariant",
        "values": [
          "'title'",
          "'section'"
        ],
        "required": false,
        "default": "'title'"
      },
      {
        "name": "title",
        "type": "string",
        "required": true
      }
    ],
    "outputs": []
  }
};
