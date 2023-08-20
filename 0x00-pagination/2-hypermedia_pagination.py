#!/usr/bin/env python3
"""Simple Pagination"""
import csv
import math
from typing import List, Tuple, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def index_range(self, page: int, page_size: int) -> Tuple[int, int]:
        """return a tuple of size two containing a start index and an end index
        corresponding to the range of indexes to return in a list for those
        particular pagination parameters."""
        return (page - 1) * page_size, page * page_size

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """returns the page that is requested if the page and page_size are
        valid arguments"""
        assert isinstance(page, int) and isinstance(page_size, int),\
            "Both the page and the page_size must be integers."
        assert page > 0 and page_size > 0,\
            "Both the page and page_sie must be greater than 0"

        dataset = self.dataset()
        a, b = self.index_range(page, page_size)
        return dataset[a:b]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """returns a simple implementation of a hypermedia pagination

        Description: This type of pagination is when you include the
        navigation through the paginated data
        """
        dataset = self.dataset()
        total_pages = math.ceil(len(dataset) / page_size)
        current_page = self.get_page(page, page_size)

        prev_page = page - 1 if page - 1 > 0 else None
        next_page = page + 1 if page + 1 <= total_pages else None
        return {
            'page_size': len(current_page),
            'page': page,
            'data': current_page,
            'next_page': next_page,
            'prev_page': prev_page,
            'total_pages': total_pages
        }
