export interface VideoDetailPlayAddr {
  uri: string;
  url_list: string[];
}

export interface VideoDetailCover {
  uri: string;
  url_list: string[];
}

export interface VideoDetail {
  play_addr: VideoDetailPlayAddr;
  cover: VideoDetailCover;
  height: number;
  width: number;
  bit_rate: number | null;
  big_thumbs: string[] | null;
}

export interface VideoInfo {
  video: VideoDetail;
}