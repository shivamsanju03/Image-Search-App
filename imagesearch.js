const accessKey="ZBmJVRlGiL1MDcKAFWRZSXkPnpyozehhYwClm2p26bA"

    const formEle=document.querySelector('form')
    const inputEle=document.querySelector('#input')
    const container=document.querySelector('.container')
    const showMore=document.querySelector('#show-more')

     let page=1;
     let inputData='';

     async function searchImage(){
        inputData=inputEle.value;
        const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
        
        let response=await fetch(url)
        const data=await response.json()

        const results=data.results

        if (page===1) {
            container.innerHTML=''
        }

        results.map((result)=>{
            const imageWrapper=document.createElement('div');
            imageWrapper.classList.add('search-result');
            const image=document.createElement('img');
            image.src=result.urls.small;
            image.alt=result.alt_description;
            const imageLink=document.createElement('a');
            imageLink.href=result.links.html;
            imageLink.target="_blank";
            imageLink.textContent=result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            container.appendChild(imageWrapper);
        });

        page++;
        if (page>1) {
            showMore.style.display='block';
        }
     }

     formEle.addEventListener('submit',(event)=>{
        event.preventDefault()
        page=1;
        searchImage()
     })
     showMore.addEventListener('click',()=>{
          searchImage();
     })
