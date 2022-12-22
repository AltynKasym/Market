import ContentLoader from "react-content-loader";
import _ from "lodash";


interface Props {
    count: number;
}


export const SkeletonAdvertCard = ({count}: Props) => {
    return (
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap"
        }}>
            {
                _.range(count)
                    .map((item, index) => (
                        <ContentLoader
                            key={index}
                            speed={2}
                            width={248}
                            height={296}
                            viewBox="0 0 248 296"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb">
                            <rect x="0" y="203" rx="8" ry="8" width="246" height="20"/>
                            <rect x="0" y="2" rx="8" ry="8" width="246" height="184"/>
                            <rect x="0" y="234" rx="8" ry="8" width="246" height="40"/>
                        </ContentLoader>
                    ))
            }
        </div>
    );
};