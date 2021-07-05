export class BannerContent {
  constructor(
    public opened: boolean,
    public message: string,
    public actionText: string,
    public action: string,
    public closed: boolean
  ) { }
}
