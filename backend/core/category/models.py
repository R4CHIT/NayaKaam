from django.db import models

# Create your models here.
class Category(models.Model):
    category = models.CharField(max_length=50)
    rating = models.FloatField(default=0.0)
    reviews = models.PositiveIntegerField(default=0)
    price = models.PositiveIntegerField()
    original_price = models.PositiveIntegerField(blank=True,null=True)
    duration = models.CharField(max_length=50)
    image = models.URLField(max_length=500, blank=True, null=True)
    discount = models.PositiveIntegerField(default=0)
    is_popular = models.BooleanField(default=False)
    features = models.JSONField(default=list,blank=True,null=True)  

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.category