import { MixinConstructor } from '@rental-system/common';

export const CanReceiveNewsletterAbility = <TBase extends MixinConstructor>(base: TBase) =>
  class extends base {
    agreedToNewsletter: boolean;

    agreeToNewsletter() {
      this.agreedToNewsletter = true;
    }

    disagreeToNewsletter() {
      this.agreedToNewsletter = false;
    }
  };
