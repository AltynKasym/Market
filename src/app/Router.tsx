import {Route, Routes} from "react-router-dom";

import {NotFound} from "@/pages/NotFound/NotFound";
import {Home} from "@/pages/home";
import {Login} from "@/pages/login";
import {PostAdvert} from "@/pages/postAdvert";
import {DetailPage} from "@/pages/DetailPage/DetailPage";
import {Help} from "@/pages/Help/Help";
import {ArticleHelp} from "@/pages/ArticleHelp/ArticleHelp";
import {PrivacyPolicy} from "@/pages/PrivacyPolicy/PrivacyPolicy";
import {ContactTheAdministration} from "@/pages/ContactTheAdministration/ContactTheAdministration";
import {About} from "@/pages/About/About";
import {Category} from "@/pages/category";
import {UserAccount} from "@/pages/userAccount";
import {AdminPanel} from "@/pages/AdminPanel/AdminPanel";
import {AdvertEdit} from "@/pages/admin/advertEdit/AdvertEdit";
import {UpdateUser} from "@/pages/AdminPanel/Users/updateUser/UpdateUser";

import {withAuth} from "./providers/withAuth";
import {SearchResult} from "@/pages/SearchResult";
import {ForgetPassword} from "@/pages/ForgetPassword/ForgetPassword";
import {Activation} from "@/pages/Activation/Activation";
import {FeedbackDetailPage} from "@/pages/AdminPanel/Feedback/feedbackDetailPage/FeedbackDetailPage";
import {AddedUser} from "@/pages/admin/addedUser/AddedUser";


const PrivatePostAdvert = withAuth(PostAdvert);


export const Router = () => {
    return (
        <Routes>
            <Route path="/404" element={<NotFound/>}/>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/auth/login" element={<Login/>}/>
            <Route path="/auth/forgot-password" element={<ForgetPassword/>}/>
            <Route path="/password-recovery" element={<Login/>}/>
            <Route path="/auth/activation" element={<Activation/>}/>
            <Route path="/post-advert" element={<PrivatePostAdvert/>}/>
            <Route path="/detail/:id/" element={<DetailPage/>}/>
            <Route path="/help" element={<Help/>}/>
            <Route path="/help/:categoryId/:helpId" element={<ArticleHelp/>}/>
            <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
            <Route path="/contact-administration" element={<ContactTheAdministration/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/category/:id" element={<Category/>}/>
            {/* TODO: надо скрыть для этого роута отображение хедера и футера*/}
            <Route path="/user-account/*" element={<UserAccount/>}/>
            <Route path="/admin/*" element={<AdminPanel/>}/>
            <Route path="/admin/advert-edit/:id" element={<AdvertEdit/>}/>
            <Route path="/user/:userId" element={<UpdateUser/>}/>
            <Route path="/admin/complaint/:feedId" element={<FeedbackDetailPage/>}/>
            <Route path="/search" element={<SearchResult/>}/>
            <Route path="/admin/added-user" element={<AddedUser/>}/>
        </Routes>
    );
};

