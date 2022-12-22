import {useEffect, useState} from "react";

import css from "./style.module.scss";
import cn from "classnames";
import {Link} from "react-router-dom";
import {Alerts} from "@/shared/ui/alerts";
import {Spinner} from "@/shared/ui/spinner";
import {adminAdvertApi} from "@/shared/api/rtk-queries/adminAdvertApi";

import noImage from "@/assets/icons/card/noImage.png";
import {ReactComponent as DeleteIcon} from "@/assets/icons/card/delete.svg";
import {ReactComponent as EditIcon} from "@/assets/icons/card/edit.svg";
import {toLower} from "lodash";
import {DTO} from "@/shared/api";
import {adminReportApi} from "@/shared/api/rtk-queries/adminReportApi";
import dayjs from "dayjs";
import {NumberlessPaginator} from "@/shared/ui/pagination/numberlessPaginator";


interface IEvent {
    target:ITarget;
}

interface ITarget {
    dataset:IData;
}

interface IData {
    name:string;
}

export const Adverts = () => {
    const {data: adminReportData} = adminReportApi.useGetAdvertsQuery();
    const [deleteAdvert] = adminAdvertApi.useDeleteAdvertbyIdMutation();
    const [sortedData, setSortedData] = useState<DTO.Advert[]>([]);
    const [reportData, setReportData] = useState([]);
    const [reverse, setReverse] = useState(false);
    const [page, setPage] = useState(0);
    const [offset, setOffset] = useState(0);
    const PAGE_SIZE = 10;

    const {data: adminAdvertsData} = adminAdvertApi.useGetAdvertsQuery({
        limit: PAGE_SIZE,
        offset: offset,
    });

    const totalQty = adminAdvertsData?.count || 0;


    const onChangePage = (pageNum: number) => {
        if (pageNum < 0)
            return;
        if (pageNum * PAGE_SIZE >= totalQty)
            return;
        setPage(pageNum);
        setOffset(pageNum * PAGE_SIZE);
    };


    console.log(reportData);
    

    
    useEffect(() => {
        setSortedData(adminAdvertsData?.results);
        setReportData(adminReportData);
        if (adminAdvertsData && adminReportData) {
            const map = new Map(adminReportData.map(x => [x.advert, x]));
            const advertsWithReports = adminAdvertsData.results.map((x, i) => {
                const report = map.get(x.id);
                return {
                    ...x,
                    reportText: report
                        ? `${report?.report_message}  ${report?.report}`
                        : ""
                };
            });
            setSortedData(advertsWithReports);
        }

    }, [adminAdvertsData, adminReportData]);

    

    sortedData?.map((item, id) => {
        return item={...item, id};
        
    });

  
    const dynamicSort = (property: keyof DTO.Advert) => {
        const sortOrder = 1;
        return function (a:DTO.Advert, b:DTO.Advert) {
            
            if (property === "name") {
                const result = (toLower(a[property]) < toLower(b[property]) ) ? -1 : (toLower(a[property])  > toLower(b[property]) ) ? 1 : 0;
                return result * sortOrder;
            } 

            const valueA = a[property];
            const valueB = b[property];

            const result = (valueA < valueB ) ? -1 : (a[property]  > b[property]) ? 1 : 0;
            return result * sortOrder;
            
        };
    };
   

    const sort = (e:IEvent) => {
        const element = e.target.dataset.name;
        setReverse(prev => !prev);
        reverse ? setSortedData([...sortedData].sort(dynamicSort(element))) : setSortedData([...sortedData].sort(dynamicSort(element)).reverse());
    };
    
    const deletePost = async (item:number) => {
        const result = await Alerts.confirm();
        
        if (result.isConfirmed) 
        {Alerts.showSuccess("Успешно удалён"); 
            await deleteAdvert(item).then(() => {
            }).catch(err => console.log("err", err));
        } else return;

    };
   
    

    const title = [
        {title: "#", dataset: "#",},
        {title: "Id", dataset: "id",},
        {title: "Name", dataset: "name"},
        {title: "Image", dataset: "advert_image_count"},
        {title: "Жалоба", dataset: "reportText"},
        {title: "Start price", dataset: "start_price"},
        {title: "End price", dataset: "end_price"},
        {title: "City", dataset: "city"},
        {title: "Created date", dataset: "created_date"},
    ];

    return adminAdvertsData ? (
        <div className={css.root}>
            <div >
                <div className={css.table}>
                    {
                        (totalQty > PAGE_SIZE) && (
                            <div className={css.pagination}>

                                <NumberlessPaginator
                                    onNextClick={() => onChangePage(page + 1)}
                                    onPrevClick={() => onChangePage(page - 1)}
                                />
                            </div>
                        )
                    }

                    <div className={cn(css.data, css.head)}>
                        {title.map((item, id) => {
                            return (
                                <span onClick={sort} data-name={item.dataset} key={id}>{item.title}</span>
                            );
                        })}
                    </div>
                    {sortedData?.map((item, id) => {

                        return (
                            <div className={css.row} key={id}>
                                <Link to = {`/detail/${item.id}`}>
                                    <div className={css.data}>
                                        <span>{+id+1+offset}</span>
                                        <span>{item.id}</span>
                                        <span>{item.name}</span>
                                        <span>
                                            <img src={item.advert_image_count ? item.advert_image[0].image : noImage}/>
                                        </span>
                                        <span>{item?.reportText}</span>
                                        <span>{item.start_price}</span>
                                        <span>{item.end_price}</span>
                                        <span>{item.city}</span>
                                        <span>{dayjs(item.created_date).format("DD.MM.YYYY HH:MM")}</span>
                                    </div>
                                </Link>
                                <div className={css.control}>
                                    <Link to={`/admin/advert-edit/${item.id}`}>
                                        <div className={css.buttons}>
                                            <button>Edit</button>
                                            <button><EditIcon/></button>
                                        </div>

                                    </Link>
                                    <div className={css.buttons} onClick={() => deletePost(item.id)}>
                                        <button >Delete</button>
                                        <button ><DeleteIcon/></button>
                                    </div>
                                </div>
                            </div>
                        );  
                      
                                          
                    })}

                </div>
               
            </div>
        </div>
    ):
        <Spinner/>;
};