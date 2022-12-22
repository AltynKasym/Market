import ContentLoader from "react-content-loader";


interface Props {
    count: number;
}


export const SkeletonCategories = ({count}: Props) => {
    return (
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            gap: "24px"
        }}>
            {
                Array(count)
                    .fill(0)
                    .map((item, index) => (
                        <ContentLoader
                            key={index}
                            speed={2}
                            style={{
                                minWidth: "112px",
                                minHeight: "127px"
                            }}
                            viewBox="0 0 112 127"
                            backgroundColor="#b0b0b0"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="0" y="92" rx="2" ry="5" width="112" height="22"/>
                            <rect x="23" y="19" rx="5" ry="5" width="60" height="60"/>
                        </ContentLoader>
                    ))
            }
        </div>
    );
};