export class HabitContract {
  constructor(
    public readonly id: string,
    public commitment: string,
    public punishment: string,
    public accountablePartnerId: string,
    public accountablePartnerName: string,
  ) { }
}
