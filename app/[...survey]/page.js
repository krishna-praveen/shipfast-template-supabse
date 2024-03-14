'use client';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
export default function Page({ params }) {
    const { survey } = params;
    const id = survey[1]
    const [data,setData] = useState([]);
    const fetchData = async () => {
      const result = await axios.get('/api/public/getPublic/', { params: {
        id: id
      }})
        // Check if result.data is an array
        if (Array.isArray(result.data.data)) {
          setData(result.data.data);
        } else {
          console.error(typeof result.data.data)
          console.error('Error: result.data is not an array');
        }
      };

    useEffect(() => {
        fetchData();
      }, []);

      console.log(data)

      return(
        <div className='flex flex-col items-center justify-center min-h-screen'>
          <div>
            {data.map((item, index) => (
              <h1 className='text-xl text-center uppercase mb-3 ' key={index}>
                {item.title}
              </h1>
            ))}
          </div>
      
          <div>
            <table className='table'>
              <tbody>
                <tr>
                  {data.map((item, index) => (
                    <td className='bg-base-200' key={index}>{item.option_1}</td>
                  ))}
                </tr>
                <tr>
                  {data.map((item, index) => (
                    <td className='bg-base-200' key={index}>{item.option_2}</td>
                  ))}
                </tr>
                <tr>
                  {data.map((item, index) => (
                    <td className='bg-base-200' key={index}>{item.option_3}</td>
                  ))}
                </tr>
                <tr>
                  {data.map((item, index) => (
                    <td className='bg-base-200' key={index}>{item.option_4}</td>
                  ))}
                </tr>
              </tbody>
            </table>         
          </div>
        </div>
      )
  }