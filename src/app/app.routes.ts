import { Routes } from '@angular/router';
import { GettingStartedShowcase } from './pages/showcase/getting-started.showcase';
import { ButtonShowcase } from './pages/showcase/button.showcase';
import { FormFieldShowcase } from './pages/showcase/form-field.showcase';
import { HintShowcase } from './pages/showcase/hint.showcase';
import { IconShowcase } from './pages/showcase/icon.showcase';
import { IconButtonShowcase } from './pages/showcase/icon-button.showcase';
import { IllustrationShowcase } from './pages/showcase/illustration.showcase';
import { InlineButtonShowcase } from './pages/showcase/inline-button.showcase';
import { LogoShowcase } from './pages/showcase/logo.showcase';
import { SpinnerShowcase } from './pages/showcase/spinner.showcase';
import { TextInputShowcase } from './pages/showcase/text-input.showcase';
import { TextOverflowShowcase } from './pages/showcase/text-overflow.showcase';
import { TooltipShowcase } from './pages/showcase/tooltip.showcase';

export const routes: Routes = [
  { path: '', redirectTo: 'getting-started', pathMatch: 'full' },
  {
    path: 'getting-started',
    component: GettingStartedShowcase,
    data: { title: 'Getting Started' },
  },
  { path: 'showcase/button', component: ButtonShowcase, data: { title: 'Button' } },
  { path: 'showcase/form-field', component: FormFieldShowcase, data: { title: 'Form Field' } },
  { path: 'showcase/hint', component: HintShowcase, data: { title: 'Hint' } },
  { path: 'showcase/icon', component: IconShowcase, data: { title: 'Icon' } },
  {
    path: 'showcase/withicon',
    component: IconButtonShowcase,
    data: { title: 'Icon Button' },
  },
  {
    path: 'showcase/illustration',
    component: IllustrationShowcase,
    data: { title: 'Illustration' },
  },
  {
    path: 'showcase/inline-button',
    component: InlineButtonShowcase,
    data: { title: 'Inline Button' },
  },
  { path: 'showcase/logo', component: LogoShowcase, data: { title: 'Logo' } },
  { path: 'showcase/spinner', component: SpinnerShowcase, data: { title: 'Spinner' } },
  { path: 'showcase/text-input', component: TextInputShowcase, data: { title: 'Text Input' } },
  {
    path: 'showcase/text-overflow',
    component: TextOverflowShowcase,
    data: { title: 'Text Overflow' },
  },
  { path: 'showcase/tooltip', component: TooltipShowcase, data: { title: 'Tooltip' } },
];
