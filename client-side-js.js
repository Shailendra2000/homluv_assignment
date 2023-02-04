let pagesize=16;
let page=0;
let clicked="view all articles"
let container=document.getElementsByClassName("body-cont")[0];
let des_container=document.getElementById("desc");
document.getElementById("loadmore").addEventListener('click',()=>{
    fetch_data(clicked);
});

window.onload=fetch_data("view all articles");

async function search(){
    let searched_data=document.getElementById("search_bar").value;
    let data=await fetch(`http://127.0.0.1:1700/?pagesize=${pagesize}&page=${page}&search=${searched_data}`);
    let json_data=await data.json();
    clicked="s";
    container.innerHTML="";
    display_data(json_data);
}

async function fetch_data(type,new_data=0){
    let data,json_data;
    console.log(clicked);
    if (new_data){
        page=1;
    }
    else{
        page+=1;
    }
    if(type=="view all articles"){
        data=await fetch(`http://127.0.0.1:1700/?pagesize=${pagesize}&page=${page}`);
        json_data=await data.json();
    }
    else{
        data=await fetch(`http://127.0.0.1:1700/?pagesize=${pagesize}&page=${page}&category=${type}`);
        json_data=await data.json();
    }
    display_data(json_data);
}

function display_data(json_data){
    console.log(json_data.length);
    button=document.getElementById("loadmore")
    if (json_data.length<16){
        button.style.display="none";
    }
    else{
        button.style.display="";
    }
    for(i=0;i<json_data.length;i++){
        let card=document.createElement("div");
        card.className="card";
        let image=document.createElement("img");
        image.src=json_data[i].image;
        image.alt="image";
        let content=document.createElement("div");
        content.className="card-content";
        let title=document.createElement("h2");
        let mdesc=document.createElement("p");
        let author=document.createElement("p");
        let description=document.createElement("div");
        title.innerText=json_data[i].title;
        author.innerText=json_data[i].author;
        mdesc.innerText=json_data[i].metaDescription;
        if(json_data[i].html){
            description.innerHTML=json_data[i].html;
        }
        else{
            json_data[i].images.forEach((item)=>{
                let image_item=document.createElement("div");
                let sub_title=document.createElement('h3');
                sub_title.innerHTML=item.subTitle;
                let sub_image=document.createElement('img');
                imageurl=fix_image(item.image);
                sub_image.src=imageurl;
                let overlay_title=document.createElement('h4');
                overlay_title.innerHTML=item.overlayTitle;
                let overlay_area=document.createElement('div');
                overlay_title.innerHTML=item.overlayAreaOne;
                image_item.appendChild(sub_title);
                image_item.appendChild(sub_image);
                image_item.appendChild(overlay_title);
                image_item.appendChild(overlay_area);
                description.appendChild(image_item);
            })
        }
        description.style.display="none";
        title.addEventListener('click',()=>{
            let back=document.createElement("button");
            back.innerText="GO BACK";
            back.style.display="block";
            document.getElementById("loadmore").style.display="none";
            back.addEventListener('click',()=>{
                container.style.display='';
                des_container.style.display='none';
                document.getElementById("loadmore").style.display="";
            })
            des_container.innerHTML=title.innerHTML+description.innerHTML;
            des_container.prepend(back);
            container.style.display='none';
            des_container.style.display='';
        })
        content.appendChild(title);
        content.appendChild(mdesc);
        content.appendChild(author);
        content.appendChild(description);
        card.appendChild(image);
        card.appendChild(content);
        container.appendChild(card);
    }
}

const items = document.querySelectorAll(".sidebar__items");
console.log(typeof items)
items.forEach((item) => {
    item.addEventListener("click", () => {
        if (clicked!=item.innerText.toLowerCase()){
            container.innerHTML="";
            prev=document.getElementById(`${clicked}`);
            clicked=item.innerText.toLowerCase();
            item.style.background="#555";
            item.style.color="white";
            prev.style.color="black";
            prev.style.background="#f1f1f1";
            fetch_data(item.innerText.toLowerCase(),1);
        }
    })
})

function fix_image(item){
    let st=item.lastIndexOf("src");
    st+=4;
    let end=item.indexOf("?");
    return item.slice(st+1,end);
}
