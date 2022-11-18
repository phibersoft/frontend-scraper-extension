type ActionGenerator<Name extends string, Payload = any> = {
  type: Name;
  payload?: Payload;
};

type ScrapeAction = ActionGenerator<'scrape'>;

export type IMessage = ScrapeAction;
