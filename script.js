document.addEventListener('DOMContentLoaded', () => {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448')
        .then(response => response.json())
        .then(data => {
            const product = data.product;
            console.log(product);
            document.querySelector('.product-vendor').textContent = product.vendor;
            document.querySelector('.product-title').textContent = product.title;
            document.querySelector('.current-price').textContent = `${product.price}`;
            document.querySelector('.compare-at-price').textContent = `${product.compare_at_price}`;
            
            let num1 = parseFloat(product.compare_at_price.slice(1));
            let num2 = parseFloat(product.price.slice(1));
            let result = ((num1 - num2) / num1) * 100;
            document.querySelector('.percentage-off').textContent = `${Math.round(result)}% Off`;
            
            document.querySelector('.product-description').innerHTML = product.description;

            const mainImage = document.getElementById("main-image");
            const thumbnails = Array.from(document.querySelector('.thumbnails').children);
            mainImage.src=product.images[0].src;
            if (product.images.length >= 4) {
                thumbnails[0].setAttribute("src", product.images[0].src);
                thumbnails[1].setAttribute("src", product.images[1].src);
                thumbnails[2].setAttribute("src", product.images[2].src);
                thumbnails[3].setAttribute("src", product.images[3].src);
            }

            const swapImages = (thumbnail) => {
                const tempSrc = mainImage.src;
                const tempAlt = mainImage.alt;
                mainImage.src = thumbnail.src;
                mainImage.alt = thumbnail.alt;
                thumbnail.src = tempSrc;
                thumbnail.alt = tempAlt;
            };

            thumbnails[0].addEventListener('click', () => swapImages(thumbnails[0]));
            thumbnails[1].addEventListener('click', () => swapImages(thumbnails[1]));
            thumbnails[2].addEventListener('click', () => swapImages(thumbnails[2]));
            thumbnails[3].addEventListener('click', () => swapImages(thumbnails[3]));

            const colorSelector = document.querySelector('.color-selector');
            let finalColor="";
            product.options[0].values.forEach(colorObj => {
                const colorName = Object.keys(colorObj)[0];
                const colorCode = colorObj[colorName];
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'color';
                input.value = colorName;
                label.appendChild(input);
                label.style.backgroundColor = colorCode;
                label.style.color = colorCode; 
             
                label.style.padding = '8px';
                label.style.margin = '5px';
                label.style.display = 'inline-block';
                label.style.listStyleType="none";
                label.style.borderRadius = '0px';
                label.addEventListener('click',()=>{
                    finalColor=(colorName);
                })
                colorSelector.appendChild(label);
            });

            const sizeSelector = document.querySelector('.size-selector1');
            let size2="";
            product.options[1].values.forEach(size => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'size';
                input.value = size;
                label.appendChild(input);
                label.addEventListener('click',()=>{
                    size2=(input.value);
                })
                label.append(size);
                sizeSelector.appendChild(label);
            });
           
          
             const plus=document.querySelector(".plus");
             const value=document.querySelector(".quatity");
             plus.addEventListener('click',()=>{
                 let value1=parseInt(value.textContent);
                  value1+=1;
                  document.querySelector(".quatity").textContent=value1.toString();
             })
             const minus=document.querySelector(".minus");
             console.log(minus);
             minus.addEventListener('click',()=>{
                let value1=parseInt(value.textContent);
                 value1-=1;
                 if(value1<=0)value1=0;
                 console.log(value1);
                document.querySelector(".quatity").textContent=value1.toString();
            })
           
            const addToCartButton = document.getElementById('add-to-cart-button');
            const cartMessage = document.getElementById('cart-message');
                
            addToCartButton.addEventListener('click', () => {
                cartMessage.textContent=`${product.title} with ${size2} and ${finalColor} is added`
                cartMessage.style.display = 'block';
            });
        })
        .catch(error => console.error('Error:', error));
});
