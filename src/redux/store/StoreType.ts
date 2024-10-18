export type StoreType = {
  home: homeStoreType;
};

export type homeStoreType = {
  cardLoader: boolean;
  cardError: boolean;
  searchLoader: boolean;
  searchError: boolean;
  card: card;
};

export type card = {
  next_url: string;
  results: cardType[];
};

export type cardType = {
  ticker: string;
  name: string;
};
