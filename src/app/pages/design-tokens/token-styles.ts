export const SECTION_STYLES = `
  :host {
    display: block;
  }

  .token-section {
    margin-bottom: var(--space-2xl, 3rem);
    scroll-margin-top: 5rem;
  }

  .section-header {
    display: flex;
    align-items: baseline;
    gap: var(--space-xs, 0.5rem);
    margin-bottom: var(--space-md, 1rem);
  }

  .section-header h3 {
    margin: 0;
    font: var(--text-style-h4, inherit);
  }

  .section-count {
    font: var(--text-style-caption, inherit);
    color: var(--color-text-surface-subtle, currentColor);
    font-variant-numeric: tabular-nums;
  }

  .mono {
    font-family: 'SFMono-Regular', ui-monospace, Menlo, Consolas, monospace;
  }

  .panel {
    border: 1px solid var(--color-border-surface, rgba(128, 128, 128, 0.25));
    border-radius: var(--border-radius-surface, 0.75rem);
    background: var(--color-bg-surface, transparent);
    overflow: hidden;
  }

  .checker {
    background-color: #fff;
    background-image:
      linear-gradient(45deg, #d9dce1 25%, transparent 25%),
      linear-gradient(-45deg, #d9dce1 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #d9dce1 75%),
      linear-gradient(-45deg, transparent 75%, #d9dce1 75%);
    background-size: 12px 12px;
    background-position: 0 0, 0 6px, 6px -6px, -6px 0;
  }

  .copy-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3xs, 0.25rem);
    flex-shrink: 0;
    min-width: 2rem;
    height: 2rem;
    padding: 0 var(--space-2xs, 0.375rem);
    border: 1px solid transparent;
    border-radius: var(--border-radius-sm, 0.375rem);
    background: transparent;
    color: var(--color-icon-surface-secondary, currentColor);
    font: var(--text-style-caption, inherit);
    cursor: pointer;
    transition:
      background-color 120ms ease,
      border-color 120ms ease,
      color 120ms ease;
  }

  .copy-btn:hover,
  .copy-btn:focus-visible {
    background: var(--color-bg-surface-hover, rgba(128, 128, 128, 0.12));
    border-color: var(--color-border-surface, rgba(128, 128, 128, 0.25));
    color: var(--color-text-brand, currentColor);
  }

  .copy-btn--copied,
  .copy-btn--copied:hover {
    color: var(--color-text-positive, #2e7d32);
    background: var(--color-bg-positive-subtle, rgba(46, 125, 50, 0.12));
    border-color: transparent;
  }
`;
