import React, { FC, PropsWithChildren } from 'react'

const Container: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="max-w-screen-lg border-x min-h-screen mx-auto border-zinc-200">
      {children}
    </div>
  )
}

export default Container