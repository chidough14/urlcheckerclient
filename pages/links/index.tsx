import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { IBreadcrumbLink } from '../../components/Breadcrumbs';
import { Layout } from '../../components/Layout';
import axios from 'axios'
import { IPaginatedData } from '../../interfaces/common/paginate.interface';
import { IUrl } from '../../interfaces/models/url.interface';
import { LinksTable } from '../../components/LinkTable';

interface IPaginateUrls extends IPaginatedData {
  data: Array<IUrl>
}

const LinkedIndexPage: NextPage = () => {
 
  const breadCrumbs: Array<IBreadcrumbLink> = [
    { name: "Home", link: "/" },
    { name: "Links", link: "#" }
  ];

  const [loading, setLoading] = useState(false)
  const [urlData, setUrlData] = useState<IPaginateUrls | null>(null)

  useEffect(() => {
    setLoading(true)

    fetchUrls()

    setLoading(false)
  }, [])

  const fetchUrls = async () => {
    const resp = await axios.get('http://localhost:8000/api/url')

    resp.status === 200 && setUrlData(resp.data.data)
  }

  return (
    <Layout pageTitle='Link lst' breadCrumbs={breadCrumbs}>
      <div className='text-4xl font-bold'>
        <h1>
          My Links
        </h1>
      </div>

      {
        urlData !== null && (
          <div className='mt-4'>
            <LinksTable data={urlData?.data}/>
          </div>
        )
      }
    </Layout>
  )
}

export default LinkedIndexPage