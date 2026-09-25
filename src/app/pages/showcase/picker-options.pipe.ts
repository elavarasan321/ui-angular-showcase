import { Pipe, PipeTransform } from '@angular/core';
import { PickerInputOption } from '@checkworkrights/ui-angular';

/**
 * Maps a plain list of values (e.g. a component's union-type option list) to the
 * `PickerInputOption[]` shape `cwr-picker-input` expects, so playground controls can feed their
 * existing const arrays straight in. An optional leading option (e.g. a "(default)" sentinel) is
 * prepended as-is.
 */
@Pipe({ name: 'pickerOptions', standalone: true })
export class PickerOptionsPipe implements PipeTransform {
  transform(
    values: readonly (string | number)[],
    leading?: PickerInputOption,
  ): PickerInputOption[] {
    const options = values.map((v) => ({ label: String(v), value: String(v) }));
    return leading ? [leading, ...options] : options;
  }
}
