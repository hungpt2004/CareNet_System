import React from 'react'
import { Button } from 'react-bootstrap'


export const SocialLoginComponent = ({Icon, size, color, title}) => {
   return (
      <Button variant="light">
         <div>
            <span>
               <Icon style={{ color: color, marginRight: '10' }} size={size} />
               <a>
                  {title}
               </a>
            </span>
         </div>
      </Button>
   )
}
