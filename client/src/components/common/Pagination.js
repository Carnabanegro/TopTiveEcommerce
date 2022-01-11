import React from 'react';
import {Pagination,PaginationItem,PaginationLink} from 'reactstrap';
import {times, uniqueId} from "lodash";
export default function ({current,size,total,onClick}){
    return(
            <Pagination className="justify-content-center p-4"   listClassName=" justify-content-center" >
                <PaginationItem>
                    <PaginationLink
                        onClick={() => onClick(0)}
                        first
                        href="#"
                    />
                </PaginationItem>
                <PaginationItem >
                    <PaginationLink
                        onClick={() => onClick(current === 0? 0: current-1)}
                        href="#"
                        previous
                        o
                    />
                </PaginationItem>
                {times((((total - 1) / size) + 1),
                    i => (
                        (i === current) || ((current - i < 8) && (current - i > 0)) || ((i - current < 8) && (i > current)) ? (
                            <PaginationItem
                                key={uniqueId()}
                                active={current === i}
                            >
                                <PaginationLink
                                    onClick={() => onClick(i)}
                                    onTouchStart={() => onClick(i)}
                                >
                                    { i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ) : null))}
                <PaginationItem>
                    <PaginationLink
                        onClick={() => onClick(current >= (Math.trunc((total - 1) / size))
                            ? current : current + 1)}
                        href="#"
                        next
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        onClick={() => onClick(Math.trunc((total - 1) / size))}
                        href="#"
                        last
                    />
                </PaginationItem>
            </Pagination>
    )
}