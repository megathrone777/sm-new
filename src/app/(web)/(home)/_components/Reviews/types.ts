export interface TFeedback {
  bgImage: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  buttonSendTitle: string;
  title: string;
}

export interface TReviewsItem {
  id: number;
  imageURL: string;
}

export interface TProps {
  buttonText: string;
  reviews: TReviewsItem[];
  title: string;
}
