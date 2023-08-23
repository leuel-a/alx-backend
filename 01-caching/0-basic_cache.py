#!/usr/bin/env python3
"""Defines the BasicCache class"""
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    def __init__(self):
        super().__init__()

    def put(self, key, item):
        """Adds a new item to the cache"""
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """Gets an item from the database by the key"""
        if key is None:
            return None
        return self.cache_data.get(key, None)


