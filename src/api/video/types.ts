export interface UriResource {
  uri: string;
  url_list: string[];
}

export interface VideoInfo {
  play_addr: UriResource;
  cover: UriResource;
  height: number;
  width: number;
  bit_rate: string;
  big_thumbs: string;
}