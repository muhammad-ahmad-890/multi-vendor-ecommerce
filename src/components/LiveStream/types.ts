export interface LiveStream {
  id: number;
  broadcasterName: string;
  startedOn: string;
  duration: string;
  completedOn: string;
  broadcasterType: string;
  recording: boolean;
  restream: boolean;
  taggedProducts: number;
}

export interface Reel {
  id: number;
  publisherName: string;
  storeName: string;
  postDate: string;
  taggedProducts: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  status: "Active" | "Inactive";
}
