import io
import matplotlib.pyplot as plt
import numpy as np
from sklearn.datasets import make_circles,make_moons,make_classification
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression

ds1 = np.random.randn(100, 2)
ds1_y = np.random.randint(0, 2, 100)
ds1[ds1_y == 0] += 2

np.random.seed(42)
ds4, ds4_y = make_circles(n_samples=300, noise=0.05, random_state=42)

np.random.seed(42)
ds3, ds3_y = make_moons(n_samples=300, noise=0.1, random_state=42)

np.random.seed(42)
ds2, ds2_y = make_classification(n_samples=300, n_features=2, n_informative=2, n_redundant=0,
                                                 n_classes=3, n_clusters_per_class=1, class_sep=1.5,
                                                 random_state=42)

def log_reg(dataset):
    plt.clf()
    if(dataset == "Dataset-1"): X,y=ds1,ds1_y
    if(dataset == "Dataset-2"): X,y=ds2,ds2_y
    if(dataset == "Dataset-3"): X,y=ds3,ds3_y
    clf = LogisticRegression()
    if(dataset == "Dataset-4"): X,y,clf=ds4,ds4_y,LogisticRegression(multi_class='multinomial')
    clf.fit(X, y)

    x_range = np.linspace(X.min(), X.max(), 100)
    xx1, xx2 = np.meshgrid(x_range, x_range)
    y_hat = clf.predict(np.c_[xx1.ravel(), xx2.ravel()])
    y_hat = y_hat.reshape(xx1.shape)

    plt.grid()
    plt.contourf(xx1, xx2, y_hat, alpha=0.2)
    plt.scatter(X[:,0],X[:,1],c=y,cmap='viridis', alpha=.7)  
    plt.title("Logistics Regression on "+dataset)

    img_bytes = io.BytesIO()
    plt.savefig(img_bytes, format='png')
    img_bytes.seek(0)
    return img_bytes, np.mean(cross_val_score(clf,X,y,scoring='accuracy',cv=10))
    
def data_set_log(dataset):
    if(dataset == "Dataset-1"): X,y=ds1,ds1_y
    if(dataset == "Dataset-2"): X,y=ds2,ds2_y
    if(dataset == "Dataset-3"): X,y=ds3,ds3_y
    if(dataset == "Dataset-4"): X,y=ds4,ds4_y

    plt.clf()
    plt.grid()
    plt.scatter(X[:,0],X[:,1],c=y)  
    plt.title("Scatter Plot of "+dataset)

    img_bytes = io.BytesIO()
    plt.savefig(img_bytes, format='png')
    img_bytes.seek(0)
    return img_bytes,0
    

    