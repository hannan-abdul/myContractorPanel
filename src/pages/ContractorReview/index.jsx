/**
 * External Dependencies
 */
 import React, { Component } from 'react';

 /**
  * Internal Dependencies
  */
 import AsyncComponent from '../../components/async-component';
 import PageWrap from '../../components/page-wrap';
 import PageTitle from '../../components/page-title';
 import PageContent from '../../components/page-content';
 
 /**
  * Component
  */
 class ContractorReview extends Component {
     render() {
         return (
             <PageWrap>
                 <PageTitle
                     // breadcrumbs={ {
                     //     '/': 'Home',
                     //     '/mailbox': {
                     //         title: 'Apps',
                     //         sub: 'apps',
                     //     },
                     // } }
                 >
                     <h1>Review</h1>
                 </PageTitle>
                 <PageContent>
                     <AsyncComponent component={ () => import( './content' ) } />
                 </PageContent>
             </PageWrap>
         );
     }
 }
 
 export default ContractorReview;
 