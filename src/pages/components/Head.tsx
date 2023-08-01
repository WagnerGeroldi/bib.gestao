import {Helmet, HelmetProvider} from "react-helmet-async";

export default function Head(props: any) {
  return (
    <HelmetProvider>
      <Helmet title={props.title} />;
    </HelmetProvider>
  );
}
