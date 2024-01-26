/// <reference types="cypress"/>
declare namespace Cypress {
  interface Chainable {
    typeRandomWords(
      count?: number,
      options?: Partial<TypeOptions>
    ): Chainable<JQuery<HTMLElement>>;
  }
}
