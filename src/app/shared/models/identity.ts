export class Identity {
  constructor(
    public id: string,
    public name: string,
    public votes: number,
    public weightings: Weighting[],
  ) { }
}

export class Weighting {
  constructor(
    public identityCategory: IdentityCategory,
    public weight: number,
    public readonly id?: any
  ) { }
}

export class IdentityCategory {
  constructor(
    public label: string,
    public en: string,
    public fr: string,
  ) { }
}
